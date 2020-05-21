import React, { createContext, useReducer } from 'react';
import { Action } from '../../types';
import log from '../Log';
import { BotAction, BotSettings, BotState } from '../../types';

export const initialState = {
    fetching: false,
    hasFailed: false,
    settings: undefined,
    dispatch: (action: Action) => undefined,
} as BotState;

//don't accept less than 2
const getNewInterval = (interval: number) =>
    interval < 2 ? undefined : interval;

//the reducer handles actions
export const reducer = (state: BotState, action: BotAction) => {
    switch (action.type) {
        //drops interval by 1 minute
        case 'decreaseInterval': {
            if (state.settings) {
                const settings = { ...state.settings };
                const { interval } = settings;

                const newInterval = getNewInterval(interval - 1);
                settings.interval = newInterval ? newInterval : interval;

                return {
                    ...state,
                    settings,
                };
            } else return state;
        }

        //increases interval by 1 minute
        case 'increaseInterval': {
            if (state.settings) {
                const settings: BotSettings = { ...state.settings };
                const { interval } = settings;

                const newInterval = getNewInterval(interval + 1);

                settings.interval = newInterval ? newInterval : interval;
                return {
                    ...state,
                    interval: newInterval ? newInterval : interval,
                };
            } else return state;
        }
        case 'fetchSettingsAttempt': {
            return {
                ...state,
                hasFailed: false,
                fetching: true,
                settings: undefined,
            };
        }
        case 'fetchSettingsFailure': {
            return {
                ...state,
                hasFailed: true,
                fetching: false,
                settings: undefined,
            };
        }
        case 'fetchSettingsSuccess': {
            const { settings } = action;
            return {
                ...state,
                hasFailed: false,
                fetching: false,
                settings,
            };
        }
        //sets the bot to run every interval in minutes
        case 'setInterval': {
            const { interval } = action;
            const newInterval = getNewInterval(interval);
            return state;
            // return {
            //     ...state,
            //     interval: newInterval ? newInterval : state.interval,
            // };
        }

        //starts the bot running with current settings
        case 'start': {
            return state;
            // return {
            //     ...state,
            //     running: true,
            // };
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
