import React, { useState, useEffect } from 'react';
import expectJSON from '../../services/Api/services/ExpectJSON';
import authFetch from '../../services/Api/services/AuthFetch';
import { Loader, Message } from 'semantic-ui-react';
import EditableInput from '../EditableInput';

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
    }, [username, isFetching, hasFetched, hasFailed]);

    const getCreds = async () => {
        setIsFetching(true);
        //api route
        const route = 'creds';
        //expect a JSON response from the fetch request to the route
        const { creds } = await expectJSON(authFetch(route));

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
                dispatch={({ doThing, value }) =>
                    value ? doThing(value) : doThing()
                }
                //@ts-ignore
                dispatchBefore={[{ doThing: (value) => setUsername(value) }]}
                //@ts-ignore
                dispatchOnFailure={[{ doThing: () => setUsername(username) }]}
                input="username"
                labelText="Bot SA Username"
                value={username}
            />
            <br />
            <br />
            <EditableInput
                configKeys={configKeys}
                dispatch={({ doThing, value }) =>
                    value ? doThing(value) : doThing()
                }
                //@ts-ignore
                dispatchBefore={[{ doThing: (value) => setPassword(value) }]}
                //@ts-ignore
                dispatchOnFailure={[{ doThing: () => setPassword(password) }]}
                input="password"
                labelText="Bot SA Password"
                password
                value={password}
            />
        </div>
    );
};

export default SACredentials;
