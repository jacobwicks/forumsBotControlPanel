import fetch from 'node-fetch';

const apiUrl = 'http://localhost:3001/';

export const getBotName = async () => {
    const route = 'botName';
    const botNameUrl = `${apiUrl}${route}`;
    const res = await fetch(botNameUrl);
    const { botName } = await res.json();
    return botName;
};

export const login = async ({
    userName,
    password,
}: {
    userName: string;
    password: string;
}) => {
    const route = 'login';
    const loginUrl = `${apiUrl}${login}`;

    const options = {
        //it's a post request
        method: 'POST',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({ userName, password }),
    };

    console.log(options);
    const res = await fetch(loginUrl, options);
    const json = await res.json();
    console.log(json);
};
