import React, { useContext } from 'react';
import { ThreadsContext } from '../../../services/ThreadsContext';
import { Segment, Header, Label, Checkbox } from 'semantic-ui-react';
import ThreadInput from '../ThreadInput';
import { ThreadsActionTypes } from '../../../types/types';
import EditableInput from '../../EditableInput';
import { bookmarkThread, unbookmarkThread } from '../../../services/Api';

const NoThread = () => (
    <Segment>
        <Header>No Thread Selected</Header>
    </Segment>
);

//     //optional limits on scanning the thread
//     //start at X page, post, stop at Y page, post
//     limit?: ThreadLimits;

//set limits? nah
//set last read
//probably want to track pages to set last read
const CurrentThread = () => {
    const { dispatch, thread, threads } = useContext(ThreadsContext);

    const currentThread = threads?.find((t) => t.threadId === thread);
    if (!currentThread) return <NoThread />;

    const {
        bookmarked,
        link,
        name,
        threadId,
        title,
        unreadPosts,
    } = currentThread;

    return (
        <>
            <Header as="h2">Current thread: {name ? name : title}</Header>
            <div>
                <Label size="large" content={'threadId:'} />{' '}
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {threadId}
                </a>
            </div>
            <br />
            <ThreadInput
                callback={() =>
                    bookmarked
                        ? unbookmarkThread({ dispatch, threadId })
                        : bookmarkThread({ dispatch, threadId })
                }
                checkbox
                input={'bookmarked'}
                threadId={threadId}
                value={bookmarked}
            />
            <ThreadInput
                threadId={threadId}
                input={'name'}
                type={ThreadsActionTypes.setName}
                value={name}
            />
            <div>
                <Label size="large" content={'Title:'} /> {title}
            </div>
            <br />
            <div>
                <Label size="large" content={'Unread Posts:'} /> {unreadPosts}
            </div>
        </>
    );
};

export default CurrentThread;
