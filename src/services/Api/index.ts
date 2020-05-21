import fetch, { Response } from 'node-fetch';
import { BotAction, BotActionTypes, BotSettings } from '../../types';

export const apiUrl = 'http://localhost:3001/api/v1/';

export const getBotName = async () => {
    const route = 'botName';
    const url = `${apiUrl}${route}`;
    const res = await fetch(url);
    const botName = (await res.json())?.botName;
    return botName;
};

const expectJSON = async (responsePromise: Promise<Response>) => {
    const response = await responsePromise;
    try {
        const json = await response.json();
        return json;
    } catch (err) {
        return undefined;
    }
};

export const getSettings = async () => {
    const route = 'settings';
    const url = `${apiUrl}${route}`;
    const response = await expectJSON(fetch(url));
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
export { default as login } from './Login';
