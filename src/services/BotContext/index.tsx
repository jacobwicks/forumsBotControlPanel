import React, { createContext, useReducer } from 'react';
import log from '../Log';
import { BotAction, FrontEndBotSettings, BotState } from '../../types/types';

export const initialState = {
    APIs: undefined,
    fetching: [],
    hasFailed: [],
    pending: [],
    settings: undefined,
    dispatch: (action: BotAction) => undefined,
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
                const settings: FrontEndBotSettings = { ...state.settings };
                const { interval } = settings;

                const newInterval = getNewInterval(interval + 1);
                console.log(newInterval);
                settings.interval = newInterval ? newInterval : interval;
                return {
                    ...state,
                    settings,
                };
            } else return state;
        }
        case 'fetchAttempt': {
            const { key } = action;

            return {
                ...state,
                hasFailed: state.hasFailed.filter((failed) => failed !== key),
                fetching: [...state.fetching, key],
                [key]: undefined,
            };
        }
        case 'fetchFailure': {
            const { key } = action;
            return {
                ...state,
                hasFailed: [...state.hasFailed, key],
                fetching: state.fetching.filter((f) => f !== key),
                [key]: undefined,
            };
        }
        case 'fetchSuccess': {
            const { content, key } = action;
            return {
                ...state,
                hasFailed: state.hasFailed.filter((failed) => failed !== key),
                fetching: state.fetching.filter((f) => f !== key),
                [key]: content,
            };
        }
        //sets the bot to run every interval in minutes
        case 'setInterval': {
            //const { interval } = action;
            //const newInterval = getNewInterval(interval);
            return state;
            // return {
            //     ...state,
            //     interval: newInterval ? newInterval : state.interval,
            // };
        }
        //sets the status of bot currently running, rather than idle
        case 'setRunning': {
            const { running } = action;
            if (state.settings) {
                const settings = {
                    ...state.settings,
                    running,
                };

                return {
                    ...state,
                    settings,
                };
            } else return state;
        }
        //starts the bot running every interval
        case 'start': {
            if (state.settings) {
                const settings = { ...state.settings };
                settings.on = true;

                return {
                    ...state,
                    settings,
                };
            } else return state;
        }
        //bot is not currently running at intervals
        case 'stop': {
            if (state.settings) {
                const settings = { ...state.settings };
                settings.on = false;

                return {
                    ...state,
                    settings,
                };
            } else return state;
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
