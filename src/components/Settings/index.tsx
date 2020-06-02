import React, { useContext, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { BotContext } from '../../services/BotContext';
import { BotFetchKeys } from '../../types/types';
import { loadSettings } from '../../services/Api';
import BotStateDisplay from './components/BotStateDisplay';
import ControlButtons from './components/ControlButtons';
import Interval from './components/Interval';
import LogViewer from '../LogViewer/';

//add what the bot is doing right now
//waiting,
//scanning threads - threadId#
//processing instructions
//posting - postAction

const Settings = () => {
    const { dispatch, hasFailed, fetching, settings } = useContext(BotContext);

    useEffect(() => {
        !fetching.includes(BotFetchKeys.settings) &&
            !hasFailed.includes(BotFetchKeys.settings) &&
            !settings &&
            loadSettings(dispatch);
    }, [dispatch, fetching, hasFailed, settings]);

    return (
        <div>
            <Segment>
                <ControlButtons />
                <BotStateDisplay />
                <Interval />
            </Segment>
            <Segment>
                <LogViewer />
            </Segment>
        </div>
    );
};

export default Settings;
