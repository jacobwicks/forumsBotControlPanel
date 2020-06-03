import fetch from 'node-fetch';

export const apiUrl = 'http://localhost:3001/api/v1/';

export const getBotName = async () => {
    const route = 'botName';
    const url = `${apiUrl}${route}`;
    const res = await fetch(url);
    const botName = (await res.json())?.botName;
    return botName;
};

export {
    acceptImage,
    createNewAlbum,
    deleteAlbum,
    loadAlbums,
    rejectImage,
} from './services/Albums';
export * from './services/Bot';
export { default as listenToEvents } from './services/Events';
export * from './services/BotSettings';
export { default as login } from './services/Login';
export { default as logout } from './services/Logout';
