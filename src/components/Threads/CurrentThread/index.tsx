import React, { useContext } from 'react';
import { ThreadsContext } from '../../../services/ThreadsContext';
import { Segment, Header } from 'semantic-ui-react';

const NoThread = () => (
    <Segment>
        <Header>No Thread Selected</Header>
    </Segment>
);

// export interface Thread {
//     title: string;
//     name?: string;
//     threadId: number;
//     lastScannedPage?: number;
//     lastScannedPost?: number;
//     newPosts?: number;
//     limits?: ThreadLimits;
// }

const CurrentThread = () => {
    const { thread, threads } = useContext(ThreadsContext);

    const currentThread = threads?.find((t) => t.threadId === thread);
    if (!currentThread) return <NoThread />;

    const { name, title, threadId } = currentThread;

    return (
        <Segment>
            <Header as="h2">Current thread: {name ? name : title}</Header>
        </Segment>
    );
};

export default CurrentThread;
