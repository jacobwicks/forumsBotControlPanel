import React, { useContext } from 'react';
import { BotContext } from '../../../../services/BotContext';
import { Button, Icon } from 'semantic-ui-react';
import { startBot, stopBot, runOnce } from '../../../../services/Api';

const ControlButtons = () => {
    const { dispatch, settings } = useContext(BotContext);
    const running = !!settings?.running;
    return (
        <div>
            <Button
                onClick={() => !running && startBot(dispatch)}
                color="green"
            >
                <Icon name="play" size="large" />
                Start
            </Button>
            <Button onClick={() => running && stopBot(dispatch)} color="red">
                <Icon name="stop" size="large" />
                Stop
            </Button>
            <Button color="blue" onClick={() => runOnce()}>
                <Icon name="play circle" size="large" />
                Run Once
            </Button>
        </div>
    );
};

export default ControlButtons;
