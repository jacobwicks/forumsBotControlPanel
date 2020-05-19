export interface Action {
    type: string;
    [key: string]: any;
}

//the types of action that the reducer in BotContext will handle
export enum BotActionTypes {
    decreaseInterval = 'decreaseInterval',
    increaseInterval = 'increaseInterval',
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
    dispatch: (action: Action) => void;
}

interface BotType {
    interval: number;
    running: boolean;
}

//a union type. The LoggedIn state will have a Stats object for any given key
//except dispatch will return the LoggedInDispatch function
export type BotState = BotType & BotDispatch;
