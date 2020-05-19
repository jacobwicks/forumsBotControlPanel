import React, { useContext } from 'react';
import { Button, Message } from 'semantic-ui-react';
import { BotContext } from '../../services/BotContext';
import { BotActionTypes } from '../../types';

const Controls = () => {
    const { dispatch, running } = useContext(BotContext);

    return (
        <div>
            <Message>
                <Message.Header>Bot State</Message.Header>
                <p>{!running && 'Not '}Running</p>
            </Message>
            <Button
                onClick={() => dispatch({ type: BotActionTypes.start })}
                color="green"
            >
                Start
            </Button>
            <Button
                onClick={() => dispatch({ type: BotActionTypes.stop })}
                color="red"
            >
                Stop
            </Button>
        </div>
    );
};

export default Controls;
