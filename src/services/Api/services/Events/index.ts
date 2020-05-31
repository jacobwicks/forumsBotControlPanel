import { apiUrl } from '../..';
import {
    BotAction,
    EventsAction,
    EventsActionTypes,
    LogEvent,
} from '../../../../types';

const listenToEvents = ({
    botDispatch,
    eventsDispatch,
}: {
    botDispatch: React.Dispatch<BotAction>;
    eventsDispatch: React.Dispatch<EventsAction>;
}) => {
    try {
        const route = 'logEvent';
        const eventUrl = `${apiUrl}${route}`;
        const events = new EventSource(eventUrl);

        events.onmessage = (event) => {
            const parsedData: LogEvent = JSON.parse(event.data);

            console.log(`got some data`, parsedData);

            eventsDispatch({
                type: EventsActionTypes.addEvent,
                event: parsedData,
            });

            // if(parsedData) {
            //     const { data } = parsedData;
            //     if
            // }
        };
    } catch (err) {
        eventsDispatch({ type: EventsActionTypes.failed });
        return undefined;
    }
};

export default listenToEvents;
