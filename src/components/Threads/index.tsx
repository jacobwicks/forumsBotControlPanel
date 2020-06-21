import React, { useContext, useEffect } from 'react';
import { ThreadsContext } from '../../services/ThreadsContext';
import { loadThreads } from '../../services/Api/services/Threads';
import {
    Grid,
    Header,
    Loader,
    Message,
    Segment,
    Button,
} from 'semantic-ui-react';
import CurrentThread from './CurrentThread';
import SideBarThreads from './SideBarThreads';

const Threads = () => {
    const { dispatch, failed, fetching, threads } = useContext(ThreadsContext);

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
                    <Header as="h2">
                        Threads{' '}
                        <Button
                            disabled={fetching}
                            onClick={() => loadThreads(dispatch)}
                            floated="right"
                            icon="refresh"
                        />
                    </Header>
                    <SideBarThreads />
                </Grid.Column>
                <Grid.Column width={12}>
                    <CurrentThread />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default Threads;
