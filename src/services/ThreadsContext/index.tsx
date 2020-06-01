import React, { createContext, useReducer } from 'react';
import { ThreadsState, ThreadsAction } from '../../types';

const initialState = {
    threads: undefined,
    failed: false,
    fetching: false,
    dispatch: (action: ThreadsAction) => undefined,
} as ThreadsState;

let reducer = (state: ThreadsState, action: ThreadsAction) => {
    switch (action.type) {
        case 'addThread': {
            const { thread } = action;
            const threads = state.threads;

            // prettier-ignore
            const newThreads = threads
                ? threads.concat(thread)
                : Array.isArray(thread)
                    ? [...thread]
                    : [thread];

            return {
                ...state,
                threads: newThreads,
            };
        }
        case 'currentThread': {
            const { threadId } = action;
            return {
                ...state,
                thread: threadId,
            };
        }
        case 'failed': {
            return {
                ...state,
                failed: true,
                fetching: false,
                threads: [],
            };
        }
        case 'fetchAttempt': {
            return {
                ...state,
                fetching: true,
            };
        }
        case 'setThreads': {
            const { threads } = action;
            return {
                ...state,
                failed: false,
                fetching: false,
                threads,
            };
        }
        default: {
            console.log(`threadsContext default`, action);
            //throw new Error();
            return state;
        }
    }
};

const ThreadsContext = createContext(initialState);

const ThreadsProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //add dispatch to value object and cast to ThreadsState
    const value = {
        ...state,
        dispatch,
    } as ThreadsState;

    return (
        <ThreadsContext.Provider value={value}>
            {props.children}
        </ThreadsContext.Provider>
    );
};

export { ThreadsContext, ThreadsProvider };