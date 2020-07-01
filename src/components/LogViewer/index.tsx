import React, { useEffect, useRef, MutableRefObject, useContext } from 'react';
import { Loader, Segment } from 'semantic-ui-react';
import LogEvent from './components/LogEvent';
import { EventsContext } from '../../services/EventsContext';
import getLineHeight from '../../services/GetLineHeight';

const LogViewer = ({ lines }: { lines?: number }) => {
    const { events } = useContext(EventsContext);

    const eventsEndRef = useRef(null) as MutableRefObject<any>;

    const scrollToBottom = () => {
        eventsEndRef?.current?.scrollIntoView({
            block: 'end',
            behavior: 'smooth',
        });
    };

    useEffect(scrollToBottom, [events]);

    const getHeight = () => {
        if (!lines) return 250;

        const lineHeight = getLineHeight();

        //multiply by lines + 1 to get the desired height
        return lineHeight ? lineHeight * (lines + 1) : 250;
    };

    return (
        <Segment
            style={{
                backgroundColor: 'black',
                color: 'lime',
                height: getHeight(),
                overflow: 'auto',
            }}
        >
            {!events ? (
                <Loader active />
            ) : (
                events.map((event, key) => (
                    <LogEvent
                        event={event}
                        key={key}
                        newest={key === events.length - 1}
                    />
                ))
            )}
            <div ref={eventsEndRef} />
        </Segment>
    );
};

export default LogViewer;
