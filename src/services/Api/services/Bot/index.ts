import authFetch from '../AuthFetch';

const runOnce = async () => {
    const route = 'runOnce';
    const response = await authFetch(route);
    console.log(`runOnce ${response?.status === 200}`);
};

export { runOnce };
