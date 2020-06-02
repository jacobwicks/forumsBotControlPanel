import React, { useContext } from 'react';
import { BotContext } from '../../../../services/BotContext';
import { Button, Icon } from 'semantic-ui-react';
import { startBot, stopBot, runOnce } from '../../../../services/Api';

const ControlButtons = () => {
    const { settings } = useContext(BotContext);
    const on = !!settings?.on;
    const running = !!settings?.running;

    return (
        <div>
            <Button onClick={() => !on && startBot()} color="green">
                <Icon name="play" size="large" />
                Start
            </Button>
            <Button onClick={() => (on || running) && stopBot()} color="red">
                <Icon name="stop" size="large" />
                Stop
            </Button>
            <Button color="blue" onClick={() => !running && runOnce()}>
                <Icon name="play circle" size="large" />
                Run Once
            </Button>
        </div>
    );
};

export default ControlButtons;
