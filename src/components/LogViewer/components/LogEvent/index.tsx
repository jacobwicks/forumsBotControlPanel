import React, { ReactElement } from 'react';
import {
    LogEvent as LogEventInterface,
    KeyStringInterface,
} from '../../../../types';
import AnimatedEllipse from '../AnimatedEllipse';
import ArrayDisplay from '../ArrayDisplay';
import ErrorEvent from '../ErrorEvent';
import ObjectDisplay from '../ObjectDisplay';

enum LogEventTypes {
    apiMessage = 'apiMessage',
    array = 'array',
    botStatus = 'botStatus',
    error = 'error',
    link = 'link',
    post = 'post',
    setting = 'setting',
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
    event: LogEventInterface;
    //if this event is the latest event received
    newest: boolean;
}) => {
    const { data, text } = event;

    const getPrint = () => {
        if (!data && text) {
            return text;
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
                    case LogEventTypes.text: {
                        children.push(<span>{data[key]}</span>);
                        return children;
                    }
                    case LogEventTypes.setting: {
                        const thisSetting = data[key];
                        const setting = Object.keys(thisSetting)[0];
                        children.push(
                            <span>
                                {setting} is {data[key][setting].toString()}
                            </span>
                        );
                        return children;
                    }
                    default: {
                        const value = data[key];
                        const display =
                            // prettier-ignore
                            typeof value === 'object'
                            ? Array.isArray(value)
                                ? <ArrayDisplay array={value} />
                                : <ObjectDisplay object={value} />
                            : value;
                        children.push(
                            <span>
                                {key}: {display}
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
        `${(time.getHours() < 10 ? '0' : '') + time.getHours()}:${
            (time.getMinutes() < 10 ? '0' : '') + time.getMinutes()
        }:${(time.getSeconds() < 10 ? '0' : '') + time.getSeconds()}> `;

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
