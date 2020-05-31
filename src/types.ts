export interface Action {
    type: string;
    [key: string]: any;
}

enum APITypes {
    access_token = 'access_token',
    access_token_secret = 'access_token_secret',
    bearerToken = 'bearerToken',
    clientId = 'clientId',
    clientSecret = 'clientSecret',
    consumerKey = 'consumerKey',
    consumerSecret = 'consumerSecret',
}

type API = { [A in APITypes]?: any };

export interface APIs {
    [key: string]: API;
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
    accept = 'accept',
    addExistingAlbum = 'addExistingAlbum',
    createNewAlbum = 'createNewAlbum',
    delete = 'delete',
    deleteAlbum = 'deleteAlbum',
    fetchAlbumsAttempt = 'fetchAlbumsAttempt',
    fetchAlbumsFailure = 'fetchAlbumsFailure',
    fetchAlbumsSuccess = 'fetchAlbumsSuccess',
    pending = 'pending',
    reject = 'reject',
    report = 'report',
    removeImage = 'removeImage',
    setAlbum = 'setAlbum',
    setDescription = 'setDescription',
    setHash = 'setHash',
    setName = 'setName',
    setReview = 'setReview',
    setStatus = 'setStatus',
}

export type AlbumsAction =
    //accepts adds an image to an album
    | { type: AlbumsActionTypes.accept; submittedAt: string }

    //adds an exisiting imgur album
    | {
          type: AlbumsActionTypes.addExistingAlbum;
          album?: string;
          description?: string;
          hash: string;
          status?: boolean;
      }

    //create a new album. user must provide the hash
    | {
          type: AlbumsActionTypes.createNewAlbum;
          album: string;
          description?: string;
          hash?: string;
      }

    //deletes an image from the queue
    | { type: AlbumsActionTypes.delete; submittedAt: string }

    //delete an album. From the bot? or from imgur altogether?
    | { type: AlbumsActionTypes.deleteAlbum; album: string }

    //trying to fetch the albums
    | { type: AlbumsActionTypes.fetchAlbumsAttempt }

    //failed to fetch the albums
    | { type: AlbumsActionTypes.fetchAlbumsFailure }

    //got the albums from the api
    | {
          type: AlbumsActionTypes.fetchAlbumsSuccess;
          albums: Albums;
          imageQueue?: ReviewImage[];
      }

    //sets the status of an image to pending
    | { type: AlbumsActionTypes.pending; submittedAt: string }

    //reject adding an image to an album
    | { type: AlbumsActionTypes.reject; submittedAt: string }

    //remove an image from an album
    | { type: AlbumsActionTypes.removeImage }

    //the image is obscene or illegal
    | { type: AlbumsActionTypes.report }

    //sets the current album to string or undefined
    | { type: AlbumsActionTypes.setAlbum; album?: string }

    //sets the description of an album
    | {
          type: AlbumsActionTypes.setDescription;
          album: string;
          value: string;
      }

    //sets the name of the album
    | {
          type: AlbumsActionTypes.setName;
          album: string;
          value: string;
      }
    //turns image review on or off
    | {
          type: AlbumsActionTypes.setReview;
          review?: boolean;
      }

    //sets the album active status
    //if true, album is available for posters to invoke or request image addition
    | {
          type: AlbumsActionTypes.setStatus;
          album: string;
          value: boolean;
      }

    //sets the hash of an album
    | { type: AlbumsActionTypes.setHash; album: string; value: string };

//The Dispatch function
interface AlbumsDispatch {
    dispatch: (action: AlbumsAction) => void;
}

export interface AlbumsType {
    album?: string;
    albums?: Albums;
    imageQueue?: ReviewImage[];
    fetching: boolean;
    hasFailed: boolean;
    review: boolean;
}

//a union type. The Albums state will have a Stats object for any given key
//except dispatch will return the LoggedInDispatch function
export type AlbumsState = AlbumsType & AlbumsDispatch;

//the types of action that the reducer in BotContext will handle
export enum BotActionTypes {
    decreaseInterval = 'decreaseInterval',
    increaseInterval = 'increaseInterval',
    fetchAttempt = 'fetchAttempt',
    fetchFailure = 'fetchFailure',
    fetchSuccess = 'fetchSuccess',
    runOnce = 'runOnce',
    setInterval = 'setInterval',
    setValueAttempt = 'setValueAttempt',
    setValueFailure = 'setValueFailure',
    setValueSuccess = 'setValueSuccess',
    start = 'start',
    stop = 'stop',
}

export enum BotFetchKeys {
    APIs = 'APIs',
    settings = 'settings',
}
export type BotAction =
    //decreases the run interval
    | { type: BotActionTypes.decreaseInterval }

    //increases the run interval
    | { type: BotActionTypes.increaseInterval }

    //attempting to fetch something from the api
    | { type: BotActionTypes.fetchAttempt; key: BotFetchKeys }

    //fetching failed
    | { type: BotActionTypes.fetchFailure; key: BotFetchKeys }

    //load APIs received from API into context
    | {
          type: BotActionTypes.fetchSuccess;
          key: BotFetchKeys;
          content: APIs | BotSettings;
      }

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
    APIs?: APIs;
    fetching: string[];
    hasFailed: string[];
    settings?: BotSettings;
}

//a union type. The LoggedIn state will have a Stats object for any given key
//except dispatch will return the LoggedInDispatch function
export type BotState = BotType & BotDispatch;

export interface Creds {
    username: string;
    password: string;
}

export enum EventsActionTypes {
    addEvent = 'addEvent',
    failed = 'failed',
    setListening = 'setListening',
}

export type EventsAction =
    //received event from event source. add it to array of LogEvents
    | {
          type: EventsActionTypes.addEvent;
          event: LogEvent;
      }

    //failed to get event source
    | { type: EventsActionTypes.failed }

    //already listening to event source
    | { type: EventsActionTypes.setListening; listening: boolean };

export interface EventsDispatch {
    dispatch: React.Dispatch<EventsAction>;
}

interface EventsType {
    events: LogEvent[];
    failed: boolean;
    listening: boolean;
}

export type EventsState = EventsType & EventsDispatch;

export interface LogEvent {
    time: number;
    data: string | KeyStringInterface;
}
//the possible states of an image submitted to be added to an album
export enum ImageReviewStatus {
    //not reviewed yet
    pending = 'PENDING',

    //accepted into the album
    accepted = 'ACCEPTED',

    //rejected from the album
    rejected = 'REJECTED',

    //image is obscene or illegal
    reported = 'REPORTED',
}

export interface KeyStringInterface {
    [key: string]: any;
}

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

    //the login modal is open or not
    | { type: LoginActionTypes.openModal }

    //login attempt succeeded
    //token has been stored in localStorage
    | { type: LoginActionTypes.success };

export interface ReviewImage {
    album: string;
    image: string;
    submittedAt: string;
    submittedBy: SAUser;
    status: ImageReviewStatus;
}

export interface SAUser {
    avatar?: string;
    id: number;
    name: string;
    title?: string;
    regDate: string;
}
