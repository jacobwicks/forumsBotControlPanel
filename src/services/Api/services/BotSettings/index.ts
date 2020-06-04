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
function debounce(f: (...args: any) => any, waitFor: number = 400) {
    let timer: any = null;

    return (...args: any) => {
        clearTimeout(timer);
        return new Promise((resolve) => {
            timer = setTimeout(() => resolve(f(...args)), waitFor);
        });
    };
}

export const setBotInterval = debounce(async (interval: number) => {
    const body = { interval };
    const route = 'setBotInterval';
    const response = await authFetch(route, true, body);
    return response?.status === 200;
}, 400);

// export const setBotInterval = debounce(async (interval: number) => {
//     const body = { interval };
//     const route = 'setInterval';
//     const response = await authFetch(route, true, body);
//     return 'whaaa';
//     //return response?.status === 200;
// });

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
