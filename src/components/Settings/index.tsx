import React, { useContext, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import { BotContext } from '../../services/BotContext';
import { BotFetchKeys } from '../../types/types';
import { loadSettings } from '../../services/Api';
import BotStateDisplay from './components/BotStateDisplay';
import ControlButtons from './components/ControlButtons';
import Interval from './components/Interval';
import LogViewer from '../LogViewer/';
import { loadTimer } from '../../services/Api/services/Timer';

const Settings = () => {
    const { dispatch, hasFailed, fetching, settings } = useContext(BotContext);

    useEffect(() => {
        if (
            !fetching.includes(BotFetchKeys.settings) &&
            !hasFailed.includes(BotFetchKeys.settings) &&
            !settings
        ) {
            //the settings and timer also come in as server sent events
            //but server sent events are slow to start up, fetch is quick
            loadSettings(dispatch);
            loadTimer(dispatch);
        }
    }, [dispatch, fetching, hasFailed, settings]);

    useEffect(() => {
        //when a tab loses focus, the browser may suspend javascript operation to save cpu time
        //this means the timer interval events that tick down the seconds stop
        //so when you look again, the timer is wrong
        //listen for the focus event that occurs when the tab gets focus
        //and load the current timer from the api
        window.addEventListener('focus', () => loadTimer(dispatch));
    }, [dispatch]);

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
