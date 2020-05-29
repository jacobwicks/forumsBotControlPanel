import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../../services/LoginContext';
import { apiUrl } from '../../services/Api';
import { Table, Loader } from 'semantic-ui-react';

interface Event {
    data: string | object;
}
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

    return (
        <Table inverted style={{ color: 'lime', minHeight: 250 }}>
            {!events ? (
                <Loader active />
            ) : (
                events.map((event, index) => (
                    <Table.Row key={index}>
                        {index + 1}: {event.data}
                    </Table.Row>
                ))
            )}
        </Table>
    );
};

export default LogViewer;
