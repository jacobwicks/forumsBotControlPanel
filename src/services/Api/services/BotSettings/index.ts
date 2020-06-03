import authFetch, { authFetchJSON } from '../AuthFetch';
import {
    BotFetchKeys,
    FrontEndBotSettings,
    BotActionTypes,
    BotAction,
} from '../../../../types/types';

interface BotSettingsResponse {
    settings: FrontEndBotSettings;
}

type BSR = BotSettingsResponse | undefined;

//gets the current settings for the bot
const getSettings = async () => {
    const route = 'settings';
    const settings = ((await authFetchJSON(route)) as BSR)?.settings;
    return settings;
};

// const decreaseInterval = async () => {};
// const increaseInterval = async () => {};

const debounce = (fn: (...args: any) => any) => {
    const time = 400;
    let timeout: NodeJS.Timeout;

    return function () {
        //@ts-ignore
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
};

const _setBotInterval = async (interval: number) => {
    console.log('setting');
    // const body = { interval };
    // const route = 'setInterval';
    // const response = await authFetch(route, true, body);
    // return response?.status === 200;
    console.log('_setBotInterval returning cactus');
    return 'cactus';
};

export const setBotInterval = (interval: number) => debounce(_setBotInterval);

export const loadSettings = async (dispatch: React.Dispatch<BotAction>) => {
    dispatch({ type: BotActionTypes.fetchAttempt, key: BotFetchKeys.settings });
    const settings = await getSettings();
    if (settings) {
        dispatch({
            type: BotActionTypes.fetchSuccess,
            key: BotFetchKeys.settings,
            content: settings,
        });
    } else
        dispatch({
            type: BotActionTypes.fetchFailure,
            key: BotFetchKeys.settings,
        });
};

export default loadSettings;
