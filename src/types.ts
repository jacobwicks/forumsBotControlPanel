export interface Action {
    type: string;
    [key: string]: any;
}

export interface Album {
    description: string;
    hash: string;
    status: boolean;
}

export interface Albums {
    [key: string]: Album;
}

export enum AlbumsActionTypes {
    approve = 'approve',
    createNew = 'createNew',
    deleteAlbum = 'deleteAlbum',
    fetchAlbumsAttempt = 'fetchAlbumsAttempt',
    fetchAlbumsFailure = 'fetchAlbumsFailure',
    fetchAlbumsSuccess = 'fetchAlbumsSuccess',
    reject = 'reject',
    report = 'report',
    removeImage = 'removeImage',
}

export type AlbumsAction =
    //approves adding an image to an album
    | { type: AlbumsActionTypes.approve }

    //create a new album. user must provide the hash
    | { type: AlbumsActionTypes.createNew }

    //delete an album. From the bot? or from imgur altogether?
    | { type: AlbumsActionTypes.deleteAlbum }

    //trying to fetch the albums
    | { type: AlbumsActionTypes.fetchAlbumsAttempt }

    //failed to fetch the albums
    | { type: AlbumsActionTypes.fetchAlbumsFailure }

    //got the albums from the api
    | { type: AlbumsActionTypes.fetchAlbumsSuccess; albums: Albums }

    //reject adding an image to an album
    | { type: AlbumsActionTypes.reject }

    //remove an image from an album
    | { type: AlbumsActionTypes.removeImage }

    //the image is obscene or illegal
    | { type: AlbumsActionTypes.report };

//The Dispatch function
interface AlbumsDispatch {
    dispatch: (action: AlbumsAction) => void;
}

interface AlbumsType {
    albums?: Albums;
    fetching: boolean;
    hasFailed: boolean;
}

//a union type. The Albums state will have a Stats object for any given key
//except dispatch will return the LoggedInDispatch function
export type AlbumsState = AlbumsType & AlbumsDispatch;

//the types of action that the reducer in BotContext will handle
export enum BotActionTypes {
    decreaseInterval = 'decreaseInterval',
    increaseInterval = 'increaseInterval',
    fetchSettingsAttempt = 'fetchSettingsAttempt',
    fetchSettingsFailure = 'fetchSettingsFailure',
    fetchSettingsSuccess = 'fetchSettingsSuccess',
    runOnce = 'runOnce',
    setInterval = 'setInterval',
    start = 'start',
    stop = 'stop',
}

export type BotAction =
    //decreases the run interval
    | { type: BotActionTypes.decreaseInterval }

    //increases the run interval
    | { type: BotActionTypes.increaseInterval }

    //attempting to fetch the settings from the api
    | { type: BotActionTypes.fetchSettingsAttempt }

    //fetching the settings failed
    | { type: BotActionTypes.fetchSettingsFailure }

    //load settings received from API into context
    | { type: BotActionTypes.fetchSettingsSuccess; settings: BotSettings }

    //runs the bot once with current settings, then stops the bot
    | { type: BotActionTypes.runOnce }

    //starts the bot running at current intervals
    | { type: BotActionTypes.start }

    //stops the bot from running if it is already running
    | { type: BotActionTypes.stop }

    //sets the interval in minutes at which the bot runs
    | { type: BotActionTypes.setInterval; interval: number };

//The Dispatch function
interface BotDispatch {
    dispatch: (action: BotAction) => void;
}

export interface BotSettings {
    botName: string;
    interval: number;
    running: boolean;
}

interface BotType {
    fetching: boolean;
    hasFailed: boolean;
    settings?: BotSettings;
}

//a union type. The LoggedIn state will have a Stats object for any given key
//except dispatch will return the LoggedInDispatch function
export type BotState = BotType & BotDispatch;

//the types of action that the reducer in BotContext will handle
export enum LoginActionTypes {
    attempt = 'attempt',
    failure = 'failure',
    logout = 'logout',
    openModal = 'openModal',
    success = 'success',
}

export type LoginAction =
    //attempting to login, waiting for response
    | { type: LoginActionTypes.attempt }

    //login attempt failed
    | { type: LoginActionTypes.failure }

    //user logs out
    | { type: LoginActionTypes.logout }
    | { type: LoginActionTypes.openModal }
    //login attempt succeeded
    //token has been stored in localStorage
    | { type: LoginActionTypes.success };
