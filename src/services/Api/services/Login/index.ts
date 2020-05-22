import { apiUrl } from '../../index';
import { LoginAction, LoginActionTypes } from '../../../../types';
import { saveToken } from '../Token';
import expectJSON from '../ExpectJSON';

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

    const res = await expectJSON(fetch(loginUrl, options));
    const token = res?.token;
    token && saveToken(token)
        ? dispatch({ type: LoginActionTypes.success })
        : dispatch({ type: LoginActionTypes.failure });
};

export default login;
