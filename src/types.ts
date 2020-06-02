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
    setRunning = 'setRunning',
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
          content: APIs | FrontEndBotSettings;
      }

    //runs the bot once with current settings, then stops the bot
    | { type: BotActionTypes.runOnce }

    //sets if the bot is currently running or not
    | { type: BotActionTypes.setRunning; running: boolean }

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

export interface FrontEndBotSettings {
    //the name that posters use to get the bot's attention
    botName: string;

    //how often the bot runs in minutes, must be > 1
    interval: number;

    //If the bot is set to run every interval or not
    on: boolean;

    //if the bot is currently running or not
    running: boolean;
}

interface BotType {
    APIs?: APIs;
    fetching: string[];
    hasFailed: string[];
    settings?: FrontEndBotSettings;
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
          event: LogEvent | LogEvent[];
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

export type LogEvent = {
    time: string;
    text?: string;
    data?: object;
};
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

//the types of log events
export enum LogEventTypes {
    apiMessage = 'apiMessage',
    array = 'array',
    botStatus = 'botStatus',
    error = 'error',
    instructions = 'instructions',
    link = 'link',
    post = 'post',
    setting = 'setting',
    threads = 'threads',
    text = 'text',
}

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
    profile: string;
    regDate: string;
}

export interface Post {
    //the name of the user that wrote the post
    author: SAUser;

    //the body of the post, without other quoted posts inside it
    body: string;

    //the date the post was made
    date: Date;

    //the unique postId number
    id: number;

    //the img.src property
    image?: string;
}

export interface Instruction extends Post {
    //the instruction that the bot received
    instruction: string;

    //the link to the post that had the instruction
    link: string;
}

interface ThreadLimits {
    startPage: number;
    startPost: number;
    stopPage: number;
    stopPost: number;
}

// export interface Thread {
//     title: string;
//     name?: string;
//     threadId: number;
//     lastScannedPage?: number;
//     lastScannedPost?: number;
//     newPosts?: number;
//     limits?: ThreadLimits;
// }

//a thread that the bot monitors
export interface FrontEndThread {
    //active is true if it was bookmarked
    //the last time we got bookmarked threads from the forums page
    active: boolean;

    //optional limits on scanning the thread
    //start at X page, post, stop at Y page, post
    limit?: ThreadLimits;

    //a link to the thread
    link: string;

    //human readable name
    //designated by you, the person running the bot
    //goes in the logs
    name?: string;

    //title from the forums
    //this is often changed
    title?: string;

    //the unique identifying number of the thread
    threadId: number;
}

export enum ThreadsActionTypes {
    addThread = 'addThread',
    currentThread = 'currentThread',
    failed = 'failed',
    fetchAttempt = 'fetchAttempt',
    setName = 'setName',
    setThreads = 'setThreads',
}

export type ThreadsAction =
    //add thread or array of threads  to array of threads
    | {
          type: ThreadsActionTypes.addThread;
          thread: FrontEndThread | FrontEndThread[];
      }

    //set the current thread
    | { type: ThreadsActionTypes.currentThread; threadId: number }

    //failed to get threads from API
    | { type: ThreadsActionTypes.failed }

    //fetching threads from API
    | { type: ThreadsActionTypes.fetchAttempt }

    //set the name of a thread
    | { type: ThreadsActionTypes.setName; threadId: number; value?: string }
    //set the whole array of threads
    | { type: ThreadsActionTypes.setThreads; threads: FrontEndThread[] };

export interface ThreadsDispatch {
    dispatch: React.Dispatch<ThreadsAction>;
}

interface ThreadsType {
    thread: number;
    threads?: FrontEndThread[];
    failed: boolean;
    fetching: boolean;
}

export type ThreadsState = ThreadsType & ThreadsDispatch;
