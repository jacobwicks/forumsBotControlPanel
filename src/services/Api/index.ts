import fetch, { Response } from 'node-fetch';
import { BotAction, BotActionTypes, BotSettings } from '../../types';
import { getHeaders } from './services/Headers';

export const apiUrl = 'http://localhost:3001/api/v1/';

const authFetch = (url: string, post?: boolean, body?: string) => {
    //wtf typescript https://stackoverflow.com/questions/47754183/typescript-cannot-add-headers-to-a-fetch-api-using-react-native
    const headers: any = getHeaders();
    if (headers) {
        const options = {
            method: post ? 'POST' : 'GET',
            headers,
        };
        //@ts-ignore
        body && (options.body = body);

        return fetch(url, options);
    }
};

export const getBotName = async () => {
    const route = 'botName';
    const url = `${apiUrl}${route}`;
    const res = await fetch(url);
    const botName = (await res.json())?.botName;
    return botName;
};

const expectJSON = async (responsePromise: Promise<Response> | undefined) => {
    if (!responsePromise) return undefined;
    const response = await responsePromise;
    try {
        const json = await response.json();
        return json;
    } catch (err) {
        return undefined;
    }
};

//gets the current settings for the bot
export const getSettings = async () => {
    const route = 'settings';
    const url = `${apiUrl}${route}`;
    const response = await expectJSON(authFetch(url));
    const settings: BotSettings | undefined = response?.settings;
    return settings;
};

export const loadSettings = async (dispatch: React.Dispatch<BotAction>) => {
    dispatch({ type: BotActionTypes.fetchSettingsAttempt });
    const settings = await getSettings();
    if (settings) {
        dispatch({ type: BotActionTypes.fetchSettingsSuccess, settings });
    } else dispatch({ type: BotActionTypes.fetchSettingsFailure });
};
export { default as login } from './services/Login';
