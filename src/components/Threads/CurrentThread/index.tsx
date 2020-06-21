import React, { useContext, useState } from 'react';
import { ThreadsContext } from '../../../services/ThreadsContext';
import { Segment, Header, Label, Button } from 'semantic-ui-react';
import ThreadInput from '../ThreadInput';
import { ThreadsActionTypes } from '../../../types/types';
import {
    bookmarkThread,
    unbookmarkThread,
    markLastRead,
    loadThreads,
} from '../../../services/Api';
import setValue from '../../../services/Api/services/SetValue';

const NoThread = () => (
    <Segment>
        <Header>No Thread Selected</Header>
    </Segment>
);

//set limits? nah
//set last read
//probably want to track pages to set last read
const CurrentThread = () => {
    const [lastRead, setLastRead] = useState<number | undefined>(undefined);
    const { dispatch, thread, threads } = useContext(ThreadsContext);

    const currentThread = threads?.find((t) => t.threadId === thread);
    if (!currentThread) return <NoThread />;

    const {
        bookmarked,
        link,
        name,
        pages,
        threadId,
        title,
        unreadPosts,
    } = currentThread;

    const style = { marginTop: 10, marginBottom: 10 };

    return (
        <>
            <Header as="h2">{name ? name : title}</Header>
            <div style={style}>
                <Label size="large" content={'threadId:'} />{' '}
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {threadId}
                </a>
            </div>
            <ThreadInput
                callback={async () =>
                    bookmarked
                        ? unbookmarkThread({ dispatch, threadId })
                        : (await bookmarkThread({ dispatch, threadId })) &&
                          loadThreads(dispatch)
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
            <div style={style}>
                <Label size="large" content={'Title:'} /> {title}
            </div>
            <div style={style}>
                <Label size="large" content={'Pages:'} />{' '}
                {pages ? pages : '???'}
            </div>
            <div style={style}>
                <Label size="large" content={'Unread Posts:'} />{' '}
                {unreadPosts !== undefined ? unreadPosts : '???'}
            </div>
            {pages && (
                <div style={style}>
                    <Label size="large" content={'Set Last Read Page: '} />
                    <input
                        value={lastRead}
                        onChange={({ target }) => {
                            const { value } = target;
                            if (!value) {
                                setLastRead(undefined);
                            } else {
                                const number = Number(value.replace(/\D/, ''));
                                setLastRead(number);
                            }
                        }}
                    />
                    <Button
                        disabled={!lastRead || lastRead > pages}
                        onClick={async () =>
                            lastRead &&
                            (await markLastRead({
                                page: lastRead,
                                threadId,
                            })) &&
                            loadThreads(dispatch)
                        }
                    >
                        Go
                    </Button>
                </div>
            )}
        </>
    );
};

export default CurrentThread;
