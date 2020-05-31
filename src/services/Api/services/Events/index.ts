import { apiUrl } from '../..';
import {
    BotAction,
    EventsAction,
    EventsActionTypes,
    LogEvent,
    BotActionTypes,
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
            const parsedEvent: LogEvent | LogEvent[] = JSON.parse(event.data);

            //parsed event is either LogEvent or LogEvent[]
            console.log(`got an event`, parsedEvent);

            eventsDispatch({
                type: EventsActionTypes.addEvent,
                event: parsedEvent,
            });

            const checkBotSetting = (ev: any) => {
                const data = ev?.data;
                if (data?.hasOwnProperty('setting')) {
                    console.log(`I have a bot setting`, data);
                    //botDispatch({type: BotActionTypes.})
                }
            };

            if (Array.isArray(parsedEvent)) {
                parsedEvent.forEach((event) => checkBotSetting(event));
            } else if (parsedEvent?.data) {
                checkBotSetting(parsedEvent);
            }
        };
    } catch (err) {
        eventsDispatch({ type: EventsActionTypes.failed });
        return undefined;
    }
};

export default listenToEvents;
