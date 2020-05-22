import React, { createContext, useReducer } from 'react';
import { Action, LoginAction } from '../../types';

//The Dispatch function
interface LoginDispatch {
    dispatch: (action: Action) => void;
}

interface LoginType {
    isLoggedIn: boolean;
    loggingIn: boolean;
    modalOpen: boolean;
}

const initialState = {
    isLoggedIn: false,
    loggingIn: false,
    modalOpen: false,
    dispatch: (action: Action) => undefined,
} as LoginState;

//a union type. The LoggedIn state will have a Stats object for any given key
//except dispatch will return the LoggedInDispatch function
export type LoginState = LoginType & LoginDispatch;

let reducer = (state: LoginState, action: LoginAction) => {
    switch (action.type) {
        case 'attempt': {
            //const { password } = action;

            return {
                ...state,
                loggingIn: true,
                isLoggedIn: false,
            };
        }
        case 'failure': {
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: false,
            };
        }
        case 'logout': {
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: false,
                modalOpen: false,
            };
        }
        case 'openModal': {
            return {
                ...state,
                modalOpen: true,
            };
        }
        case 'success': {
            return {
                ...state,
                loggingIn: false,
                isLoggedIn: true,
                modalOpen: false,
            };
        }
        default: {
            console.log(`loginContext default`, action);
            //throw new Error();
            return state;
        }
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
