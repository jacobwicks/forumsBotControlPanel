import React, { createContext, useReducer } from 'react';
import { Action } from '../../types';
import log from '../Log';
import { AlbumsAction, AlbumsState } from '../../types';

export const initialState = {
    albums: undefined,
    fetching: false,
    hasFailed: false,
    imageQueue: undefined,
    dispatch: (action: Action) => undefined,
} as AlbumsState;

//the reducer handles actions
export const reducer = (state: AlbumsState, action: AlbumsAction) => {
    console.log(`received action`, action);
    switch (action.type) {
        case 'fetchAlbumsAttempt': {
            return {
                ...state,
                albums: undefined,
                imageQueue: undefined,
                hasFailed: false,
                fetching: true,
            };
        }
        case 'fetchAlbumsFailure': {
            return {
                ...state,
                albums: undefined,
                imageQueue: undefined,
                hasFailed: true,
                fetching: false,
            };
        }
        case 'fetchAlbumsSuccess': {
            const { albums, imageQueue } = action;
            return {
                ...state,
                albums,
                imageQueue,
                hasFailed: false,
                fetching: false,
            };
        }
        case 'setDescription': {
            const { album, value } = action;
            const { albums } = state;
            if (!albums) return state;
            const newAlbum = { ...albums[album] };
            newAlbum.description = value;

            return {
                ...state,
                albums: {
                    ...albums,
                    [album]: newAlbum,
                },
            };
        }
        case 'setHash': {
            const { album, hash } = action;
            const { albums } = state;
            if (!albums) return state;
            const newAlbum = { ...albums[album] };
            newAlbum.hash = hash;

            return {
                ...state,
                albums: {
                    ...albums,
                    [album]: newAlbum,
                },
            };
        }
        default:
            //log the bad action
            log('albumsContext reducer received bad action', action);

            //return the current state unchanged
            return state;
    }
};

const AlbumsContext = createContext(initialState);

//the Props that the AlbumsProvider will accept
type AlbumsProps = {
    //You can put react components inside of the Provider component
    children: React.ReactNode;

    //We might want to pass a state into the Provider for testing purposes
    testState?: AlbumsState;

    testDispatch?: (args: any) => void;
};

const AlbumsProvider = ({ children, testState, testDispatch }: AlbumsProps) => {
    //useReducer returns an array containing the state at [0]
    //and the dispatch method at [1]
    //use array destructuring to get state and dispatch
    const [state, dispatch] = useReducer(
        reducer,
        testState ? testState : initialState
    );

    //add dispatch to value object and cast to AlbumsState
    const value = {
        ...state,
        dispatch,
    } as AlbumsState;

    return (
        <AlbumsContext.Provider value={value}>
            {children}
        </AlbumsContext.Provider>
    );
};

export { AlbumsContext, AlbumsProvider };