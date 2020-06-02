import React, { useContext } from 'react';
import { ThreadsContext } from '../../../services/ThreadsContext';
import { Segment, Header } from 'semantic-ui-react';
import ThreadInput from '../ThreadInput';
import { ThreadsActionTypes } from '../../../types';

const NoThread = () => (
    <Segment>
        <Header>No Thread Selected</Header>
    </Segment>
);

// //a thread that the bot monitors
// export interface FrontEndThread {
//     //active is true if it was bookmarked
//     //the last time we got bookmarked threads from the forums page
//     active: boolean;

//     //optional limits on scanning the thread
//     //start at X page, post, stop at Y page, post
//     limit?: ThreadLimits;

//     //a link to the thread
//     link: string;

//     //human readable name
//     //designated by you, the person running the bot
//     //goes in the logs
//     name?: string;

//     //title from the forums
//     //this is often changed
//     title?: string;

//     //the unique identifying number of the thread
//     threadId: number;
// }

const CurrentThread = () => {
    const { thread, threads } = useContext(ThreadsContext);

    const currentThread = threads?.find((t) => t.threadId === thread);
    if (!currentThread) return <NoThread />;

    const { name, title, threadId } = currentThread;

    return (
        <>
            <Header as="h2">Current thread: {name ? name : title}</Header>
            <ThreadInput
                thread={thread}
                input={'name'}
                type={ThreadsActionTypes.setName}
                value={name}
            />
        </>
    );
};

export default CurrentThread;
