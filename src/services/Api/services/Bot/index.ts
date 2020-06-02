import authFetch from '../AuthFetch';

const runOnce = async () => {
    const route = 'runOnce';
    const response = await authFetch(route);
    console.log(`runOnce ${response?.status === 200}`);
};

const startBot = async () => {
    const route = 'startBot';
    await authFetch(route);
    //don't do anything with the response
    //if successful, a server sent event will be sent to the eventlistener
    //that will propagate to the context and the components
};

const stopBot = async () => {
    const route = 'stopBot';
    const botStopped = await authFetch(route);
    console.log(`bot stopped response`, botStopped?.status);
};

export { startBot, stopBot, runOnce };
