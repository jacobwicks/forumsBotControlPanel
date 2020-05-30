import React, { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../../services/Api';
import { Loader, Segment } from 'semantic-ui-react';
import LogEvent from './components/LogEvent';
import { Event } from '../../types';

const LogViewer = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (!listening) {
            const route = 'logEvent';
            const eventUrl = `${apiUrl}${route}`;
            const events = new EventSource(eventUrl);
            events.onmessage = (event) => {
                const parsedData: Event = JSON.parse(event.data);
                console.log(`got some data`, parsedData);
                setEvents((events) => events.concat(parsedData));
            };

            setListening(true);
        }
    }, [listening, events]);

    const eventsEndRef = useRef(null);

    const scrollToBottom = () => {
        //@ts-ignore
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
                scrollbarColor: 'lime',
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
