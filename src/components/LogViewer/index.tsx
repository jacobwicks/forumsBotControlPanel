import React, { useState, useEffect, useContext, useRef } from 'react';
import { LoginContext } from '../../services/LoginContext';
import { apiUrl } from '../../services/Api';
import { Table, Loader, Segment } from 'semantic-ui-react';
import AnimatedEllipse from './AnimatedEllipse';

interface KeyString {
    [key: string]: any;
}

interface Event {
    time: number;
    data: string | KeyString;
}

enum LogEventTypes {
    apiMessage = 'apiMessage',
    botStatus = 'botStatus',
    link = 'link',
    post = 'post',
}
//api message
//link
//post
//image
const LogEvent = ({ event, newest }: { event: Event; newest: boolean }) => {
    let { data } = event;
    console.log(`time ${event.time}`, data);
    let print: any =
        typeof data === 'object'
            ? Object.keys(data).reduce((acc, cur, index) => {
                  //@ts-ignore
                  if (index === 0) return `${cur}: ${(data as KeyString)[cur]}`;
                  //@ts-ignore
                  return `${acc}|| ${cur}: ${(data as KeyString)[cur]}`;
              }, '')
            : data;

    const time = new Date(event.time);

    const parsedTime =
        time &&
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}> `;

    if (newest && print.slice(-3) === '...') {
        print = (
            <>
                {print.slice(0, -3)}
                <AnimatedEllipse />
            </>
        );
    }
    return (
        <div>
            {time && <span style={{ color: 'yellow' }}>{parsedTime}</span>}
            {print}
        </div>
    );
};

const LogViewer = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [listening, setListening] = useState(false);

    const route = 'logEvent';
    const eventUrl = `${apiUrl}${route}`;

    useEffect(() => {
        if (!listening) {
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
