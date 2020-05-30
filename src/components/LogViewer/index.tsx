import React, { useState, useEffect, useRef, ReactElement } from 'react';
import { apiUrl } from '../../services/Api';
import { Loader, Segment } from 'semantic-ui-react';
import AnimatedEllipse from './components/AnimatedEllipse';
import ErrorEvent from './components/ErrorEvent';

interface KeyStringInterface {
    [key: string]: any;
}

function assertIsKeyStringInterface(
    data: string | KeyStringInterface
): asserts data is KeyStringInterface {
    if (!(typeof data === 'object')) {
        throw new Error('data is not a KeyStringInterface');
    }
}

interface Event {
    time: number;
    data: string | KeyStringInterface;
}

enum LogEventTypes {
    apiMessage = 'apiMessage',
    botStatus = 'botStatus',
    error = 'error',
    link = 'link',
    post = 'post',
}

//api message
//link
//post
//image
const LogEvent = ({
    event,
    newest,
}: {
    //the event from the api
    event: Event;
    //if this event is the latest event received
    newest: boolean;
}) => {
    let { data } = event;
    console.log(`time ${event.time}`, data);

    const getPrint = () => {
        if (typeof data === 'string') {
            return data;
        } else if (typeof data === 'object') {
            const children = Object.keys(data).reduce((children, key) => {
                assertIsKeyStringInterface(data);
                switch (key) {
                    case LogEventTypes.error: {
                        const errorChild = (
                            <ErrorEvent newest={newest} error={data[key]} />
                        );
                        children.push(errorChild);
                        return children;
                    }
                    default: {
                        children.push(
                            <span>
                                {key}: {data[key]}
                            </span>
                        );
                    }
                }

                return children;
            }, [] as ReactElement[]);

            return <>{children}</>;
        }
    };

    let print = getPrint();
    // let print: any =
    //     typeof data === 'object'
    //         ? Object.keys(data).reduce((acc, cur, index) => {
    //               //@ts-ignore
    //               if (index === 0) return `${cur}: ${(data as KeyString)[cur]}`;
    //               //@ts-ignore
    //               return `${acc}|| ${cur}: ${(data as KeyString)[cur]}`;
    //           }, '')
    //         : data;

    const time = new Date(event.time);

    const parsedTime =
        time &&
        `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}> `;

    if (newest && typeof print === 'string' && print.slice(-3) === '...') {
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
