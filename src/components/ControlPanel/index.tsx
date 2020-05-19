import React, { ReactElement } from 'react';
import { Tab } from 'semantic-ui-react';
import ApiKeys from '../ApiKeys';
import SACredentials from '../SACredentials';
import Albums from '../Albums';
import Controls from '../Controls';

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
        menuItem: 'Controls',
        render: () => (
            <Tab.Pane>
                <Controls />
            </Tab.Pane>
        ),
    },
    {
        menuItem: 'API Keys',
        render: () => (
            <Tab.Pane>
                Click on an Api to edit its keys and secrets
                <ApiKeys />
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
    { menuItem: 'Logging', render: () => <Tab.Pane>Placeholder</Tab.Pane> },
];

const ControlPanel = () => <Tab panes={tabs} />;

export default ControlPanel;
