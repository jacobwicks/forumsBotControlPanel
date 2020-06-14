import React, { useState, useEffect } from 'react';
import authFetch, {
    authFetchJSON,
} from '../../services/Api/services/AuthFetch';
import {
    Button,
    Loader,
    Message,
    Segment,
    Label,
    Icon,
} from 'semantic-ui-react';
import EditableInput from '../EditableInput';
import { BotAction, Creds } from '../../types/types';
import Cookies from './Cookies';

interface CredsResponse {
    creds: Creds;
}

type CR = CredsResponse | undefined;

const LoginButton = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [success, setSuccess] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const testCreds = async () => {
        setIsFetching(true);
        //api route
        const route = 'testCreds';
        //expect a JSON response from the fetch request to the route
        const success = (await authFetch(route))?.status === 200;

        //done trying to fetch
        setIsFetching(false);
        setSuccess(success);
        setHasFetched(true);
    };

    return (
        <>
            <Button onClick={() => testCreds()} loading={isFetching}>
                Test Login
            </Button>
            {hasFetched ? (
                success ? (
                    <Icon name="thumbs up outline" />
                ) : (
                    <Icon name="thumbs down outline" />
                )
            ) : undefined}
        </>
    );
};

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
        <>
            <Segment>
                <EditableInput
                    configKeys={configKeys}
                    dispatch={({ value }) => setUsername(value)}
                    dispatchBefore={[{} as BotAction]}
                    dispatchOnFailure={[
                        ({ value: username } as any) as BotAction,
                    ]}
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
                    dispatchOnFailure={[
                        ({ value: password } as any) as BotAction,
                    ]}
                    input="password"
                    labelText="Bot SA Password"
                    password
                    value={password}
                />
                <br />
                <LoginButton />
            </Segment>
            <Cookies />
        </>
    );
};

export default SACredentials;
