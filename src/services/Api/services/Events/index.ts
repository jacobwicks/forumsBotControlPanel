import { apiUrl } from '../..';
import {
    BotAction,
    EventsAction,
    EventsActionTypes,
    LogEvent,
    BotActionTypes,
    ThreadsAction,
    ThreadsActionTypes,
} from '../../../../types';

const listenToEvents = ({
    botDispatch,
    eventsDispatch,
    threadsDispatch,
}: {
    botDispatch: React.Dispatch<BotAction>;
    eventsDispatch: React.Dispatch<EventsAction>;
    threadsDispatch: React.Dispatch<ThreadsAction>;
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

            const checkThreads = (ev: any) => {
                const data = ev?.data;

                if (data?.hasOwnProperty('threads')) {
                    const { threads } = data;

                    threadsDispatch({
                        type: ThreadsActionTypes.setThreads,
                        threads,
                    });
                }
            };

            //received an array of events
            if (Array.isArray(parsedEvent)) {
                //check each event for settings or threads
                parsedEvent.forEach((event) => {
                    checkBotSetting(event);
                    checkThreads(event);
                });
            } else if (parsedEvent?.data) {
                checkBotSetting(parsedEvent);
                checkThreads(parsedEvent);
            }
        };
    } catch (err) {
        eventsDispatch({ type: EventsActionTypes.failed });
        return undefined;
    }
};

export default listenToEvents;
