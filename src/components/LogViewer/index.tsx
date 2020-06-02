import React, { useEffect, useRef, MutableRefObject, useContext } from 'react';
import { Loader, Segment } from 'semantic-ui-react';
import LogEvent from './components/LogEvent';
import { EventsContext } from '../../services/EventsContext';

const LogViewer = () => {
    const { events } = useContext(EventsContext);

    const eventsEndRef = useRef(null) as MutableRefObject<any>;

    const scrollToBottom = () => {
        eventsEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [events]);

    return (
        <Segment
            style={{
                backgroundColor: 'black',
                color: 'lime',
                height: 250,
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
