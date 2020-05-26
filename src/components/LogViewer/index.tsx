import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../services/LoginContext';
import { apiUrl } from '../../services/Api';

const LogViewer = () => {
    const [thisEventSource, setThisEventSource] = useState<
        EventSource | undefined
    >(undefined);

    const [gettingEvent, setGettingEvent] = useState(false);

    const getEventSource = () => {
        const eventRoute = 'logEvent';
        const eventUrl = `${apiUrl}${eventRoute}`;
        const evtSource = new EventSource(eventUrl, {
            withCredentials: true,
        });
    };

    useEffect(() => {
        if (!thisEventSource && !gettingEvent) {
            setGettingEvent(true);
            getEventSource();
        }
    }, [thisEventSource, gettingEvent, getEventSource]);

    return <div>Log Viewer Placeholder</div>;
};

export default LogViewer;
