import fetch, { Response } from 'node-fetch';
import { BotAction, BotActionTypes, BotSettings } from '../../types';
import { getHeaders } from './services/Headers';

export const apiUrl = 'http://localhost:3001/api/v1/';

export const getBotName = async () => {
    const route = 'botName';
    const url = `${apiUrl}${route}`;
    const res = await fetch(url);
    const botName = (await res.json())?.botName;
    return botName;
};

export { default as loadSettings } from './services/BotSettings';
export { default as login } from './services/Login';
