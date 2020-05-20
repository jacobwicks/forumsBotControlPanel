import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3001/';

export const getBotName = async () => {
    const route = 'botName';
    const url = `${apiUrl}${route}`;
    const res = await fetch(url);
    const botName = (await res.json())?.botName;
    return botName;
};

export const getControls = async () => {
    const route = 'controls';
    const url = `${apiUrl}${route}`;
    const res = await fetch(url);
    const controls = await res.json();
    return controls;
};

export const login = async ({
    userName,
    password,
}: {
    userName: string;
    password: string;
}) => {
    const route = 'login';
    const loginUrl = `${apiUrl}${route}`;

    const body = JSON.stringify({
        userName,
        password,
    });

    const options = {
        //it's a post request
        method: 'POST',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body,
    };

    console.log(options);
    const res = await fetch(loginUrl, options);
    const json = await res.json();
    console.log(json);
};
