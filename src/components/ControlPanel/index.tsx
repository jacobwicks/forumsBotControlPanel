import React, { useContext, useEffect } from 'react';
import { Tab } from 'semantic-ui-react';
import APIs from '../APIs';
import SACredentials from '../SACredentials';
import Albums from '../Albums';
import Settings from '../Settings';
import Threads from '../Threads';
import { listenToEvents } from '../../services/Api';
import { EventsContext } from '../../services/EventsContext';
import { BotContext } from '../../services/BotContext';
// edit the config.json file that the bot accesses
// input api keys and secrets to config.json file
// Change the bot name
// change the sa userName and password stored in the bot config
// turn responses (keyword and action pairs) on and off
// view logs, including date picker
// view stats
// review images submitted to albums, accept or reject them
// ignore users
// set email addres for error alerts/crashes
// real time viewer- scrolling window of executed instructions, posts made, and errors
// Start and STop button
// Interval timer
// Countdouwn until next time the bot runs
// List of current threads viewed

const tabs = [
    {
        menuItem: 'Settings',
        render: () => (
            <Tab.Pane>
                <Settings />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'API Keys',
        render: () => (
            <Tab.Pane>
                Click on an Api to edit its keys and secrets
                <APIs />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'SA Credentials',
        render: () => (
            <Tab.Pane>
                <SACredentials />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Responses',
        render: () => (
            <Tab.Pane>
                Placeholder- set the botName variable, lets you turn different
                responses on and off. Also, ignore users by name or userId
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Image Albums',
        render: () => (
            <Tab.Pane>
                <Albums />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'Threads',
        render: () => (
            <Tab.Pane>
                <Threads />
            </Tab.Pane>
        ),
    },
];

const ControlPanel = () => {
    const { dispatch: eventsDispatch, failed, listening } = useContext(
        EventsContext
    );
    const { dispatch: botDispatch } = useContext(BotContext);

    useEffect(() => {
        !listening &&
            !failed &&
            listenToEvents({
                botDispatch,
                eventsDispatch,
            });
    }, [listening, failed, botDispatch, eventsDispatch]);

    return <Tab panes={tabs} />;
};

export default ControlPanel;
