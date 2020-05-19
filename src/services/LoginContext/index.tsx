import React, { createContext, useReducer } from 'react';
import { Action } from '../../types';
//The Dispatch function
interface LoginDispatch {
    dispatch: (action: Action) => void;
}

interface LoginType {
    isLoggedIn: boolean;
    loggingIn: boolean;
}

const initialState = {
    isLoggedIn: false,
    loggingIn: false,
    dispatch: (action: Action) => undefined,
} as LoginState;

//a union type. The LoggedIn state will have a Stats object for any given key
//except dispatch will return the LoggedInDispatch function
export type LoginState = LoginType & LoginDispatch;

let reducer = (state: LoginState, action: Action) => {
    switch (action.type) {
        case 'login': {
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: true,
            };
        }
        case 'logout': {
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: false,
            };
        }
        case 'openLoginModal': {
            return {
                ...state,
                loggingIn: true,
            };
        }
        case 'toggle': {
            return {
                ...state,
                isLoggedIn: !state.isLoggedIn,
            };
        }
        default:
            throw new Error();
    }
};

const LoginContext = createContext(initialState);
const LoginProvider = (props: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //add dispatch to value object and cast to LoggedInState
    const value = {
        ...state,
        dispatch,
    } as LoginState;

    return (
        <LoginContext.Provider value={value}>
            {props.children}
        </LoginContext.Provider>
    );
};

export { LoginContext, LoginProvider };
