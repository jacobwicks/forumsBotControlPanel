import React, { ReactElement } from 'react';
import { Event, KeyStringInterface } from '../../../../types';
import AnimatedEllipse from '../AnimatedEllipse';
import ArrayDisplay from '../ArrayDisplay';
import ErrorEvent from '../ErrorEvent';

enum LogEventTypes {
    apiMessage = 'apiMessage',
    array = 'array',
    botStatus = 'botStatus',
    error = 'error',
    link = 'link',
    post = 'post',
    text = 'text',
}

function assertIsKeyStringInterface(
    data: string | KeyStringInterface
): asserts data is KeyStringInterface {
    if (!(typeof data === 'object')) {
        throw new Error('data is not a KeyStringInterface');
    }
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
                    case LogEventTypes.array: {
                        const array = data[key];
                        const arrayChild = <ArrayDisplay array={array} />;
                        children.push(arrayChild);
                        return children;
                    }
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

export default LogEvent;
