import React, { useState, useEffect } from 'react';
import { authFetchJSON } from '../../services/Api/services/AuthFetch';
import { Loader, Message } from 'semantic-ui-react';
import EditableInput from '../EditableInput';
import { BotAction, Creds } from '../../types';

interface CredsResponse {
    creds: Creds;
}

type CR = CredsResponse | undefined;

const SACredentials = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isFetching, setIsFetching] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (
            (!username || !password) &&
            !isFetching &&
            !hasFetched &&
            !hasFailed
        ) {
            getCreds();
        }
    }, [username, isFetching, hasFetched, hasFailed, password]);

    const getCreds = async () => {
        setIsFetching(true);
        //api route
        const route = 'creds';
        //expect a JSON response from the fetch request to the route
        const creds = ((await authFetchJSON(route)) as CR)?.creds;

        //done trying to fetch
        setIsFetching(false);

        if (!creds) {
            setHasFailed(true);
            setHasFetched(false);
            setUsername('');
            setPassword('');
        } else {
            setHasFailed(false);
            setHasFetched(true);
            const { username, password } = creds;
            setUsername(username);
            setPassword(password);
        }
    };

    const configKeys = ['settings', 'creds'];

    return (!hasFailed && !hasFetched) || isFetching ? (
        <Loader active />
    ) : hasFailed ? (
        <Message warning>
            <Message.Header>
                Failed to get credentials from the API!
            </Message.Header>
            <p>Check your settings, then try again.</p>
        </Message>
    ) : (
        <div>
            <EditableInput
                configKeys={configKeys}
                dispatch={({ value }) => setUsername(value)}
                dispatchBefore={[{} as BotAction]}
                dispatchOnFailure={[({ value: username } as any) as BotAction]}
                input="username"
                labelText="Bot SA Username"
                value={username}
            />
            <br />
            <br />
            <EditableInput
                configKeys={configKeys}
                dispatch={({ value }) => setPassword(value)}
                dispatchBefore={[{} as BotAction]}
                dispatchOnFailure={[({ value: password } as any) as BotAction]}
                input="password"
                labelText="Bot SA Password"
                password
                value={password}
            />
        </div>
    );
};

export default SACredentials;
