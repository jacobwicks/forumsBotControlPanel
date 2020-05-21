import { apiUrl } from '../index';
import { LoginAction, LoginActionTypes } from '../../../types';

const login = async ({
    dispatch,
    password,
}: {
    dispatch: React.Dispatch<LoginAction>; //(args: any) => void;
    password: string;
}) => {
    dispatch({ type: LoginActionTypes.attempt });

    const route = 'login';
    const loginUrl = `${apiUrl}${route}`;

    const body = JSON.stringify({
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

    const res = await fetch(loginUrl, options);
    const json = await res.json();
    const { token } = json;

    try {
        localStorage.setItem('token', token);
        dispatch({ type: LoginActionTypes.success });
    } catch (err) {
        console.error("couldn't store login token", err);
    }
};

export default login;
