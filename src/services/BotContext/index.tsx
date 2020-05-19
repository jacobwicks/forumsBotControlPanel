import React, { createContext, useReducer } from 'react';
import { Action } from '../../types';
import log from '../Log';
import { interval } from '../../config.json';
import { BotAction, BotState } from '../../types';

export const initialState = {
    running: false,
    dispatch: (action: Action) => undefined,

    //if the interval imported from config is a number, use it
    //otherwise set to 5
    interval: typeof interval === 'number' ? interval : 5,
} as BotState;

//don't accept less than 2
const getNewInterval = (interval: number) =>
    interval < 2 ? undefined : interval;

//the reducer handles actions
export const reducer = (state: BotState, action: BotAction) => {
    switch (action.type) {
        //drops interval by 1 minute
        case 'decreaseInterval': {
            const { interval } = state;
            const newInterval = getNewInterval(state.interval - 1);

            return {
                ...state,
                interval: newInterval ? newInterval : interval,
            };
        }

        //increases interval by 1 minute
        case 'increaseInterval': {
            const { interval } = state;
            const newInterval = getNewInterval(state.interval + 1);

            return {
                ...state,
                interval: newInterval ? newInterval : interval,
            };
        }

        //sets the bot to run every interval in minutes
        case 'setInterval': {
            const { interval } = action;
            const newInterval = getNewInterval(interval);

            return {
                ...state,
                interval: newInterval ? newInterval : state.interval,
            };
        }

        //starts the bot running with current settings
        case 'start': {
            return {
                ...state,
                running: true,
            };
        }

        //stops the bot if it is currently running
        case 'stop': {
            return {
                ...state,
                running: false,
            };
        }

        default:
            //log the bad action
            log('botContext reducer received bad action', action);

            //return the current state unchanged
            return state;
    }
};

const BotContext = createContext(initialState);

//the Props that the CardProvider will accept
type BotProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;

    //We might want to pass a state into the CardProvider for testing purposes
    testState?: BotState;

    testDispatch?: (args: any) => void;
};

const BotProvider = ({ children, testState, testDispatch }: BotProps) => {
    //useReducer returns an array containing the state at [0]
    //and the dispatch method at [1]
    //use array destructuring to get state and dispatch
    const [state, dispatch] = useReducer(
        reducer,
        testState ? testState : initialState
    );

    //add dispatch to value object and cast to LoggedInState
    const value = {
        ...state,
        dispatch,
    } as BotState;

    return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
};

export { BotContext, BotProvider };
