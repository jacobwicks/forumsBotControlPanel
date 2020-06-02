import React, { useContext, useEffect } from 'react';
import { ThreadsContext } from '../../services/ThreadsContext';
import { loadThreads } from '../../services/Api/services/Threads';
import {
    Grid,
    Header,
    Loader,
    Message,
    Label,
    Segment,
} from 'semantic-ui-react';
import { ThreadsActionTypes } from '../../types/types';
import CurrentThread from './CurrentThread';

const Threads = () => {
    const { dispatch, failed, fetching, thread, threads } = useContext(
        ThreadsContext
    );

    useEffect(() => {
        !fetching && !failed && !threads && loadThreads(dispatch);
    }, [dispatch, fetching, failed, threads]);

    if (!threads && fetching) return <Loader active />;

    if (!threads && failed)
        return <Message warning>Failed to load threads</Message>;

    return (
        <Segment>
            <Grid columns={2} divided>
                <Grid.Column width={4}>
                    <Header as="h2">Threads</Header>
                    {threads?.map((t) => {
                        const { name, title, threadId } = t;
                        return (
                            <div style={{ padding: 10 }}>
                                <Label
                                    color={
                                        threadId === thread
                                            ? 'green'
                                            : undefined
                                    }
                                    style={{ cursor: 'pointer' }}
                                    onClick={() =>
                                        dispatch({
                                            type:
                                                ThreadsActionTypes.currentThread,
                                            threadId,
                                        })
                                    }
                                >
                                    {name ? name : title}
                                </Label>
                            </div>
                        );
                    })}
                </Grid.Column>
                <Grid.Column>
                    <CurrentThread />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default Threads;
