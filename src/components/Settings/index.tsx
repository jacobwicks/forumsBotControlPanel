import React, { useContext, useEffect } from 'react';
import { Button, Input, Message } from 'semantic-ui-react';
import { BotContext } from '../../services/BotContext';
import { BotActionTypes } from '../../types';
import { loadSettings } from '../../services/Api';

//add what the bot is doing right now
//waiting,
//scanning threads - threadId#
//processing instructions
//posting - postAction

const Settings = () => {
    const { dispatch, hasFailed, fetching, settings } = useContext(BotContext);
    const { interval, running } = settings || {
        interval: undefined,
        running: undefined,
    };

    useEffect(() => {
        !fetching && !hasFailed && !settings && loadSettings(dispatch);
    }, [dispatch, fetching, hasFailed, settings, loadSettings]);

    return (
        <div>
            <Message>
                <Message.Header>Bot State</Message.Header>
                <p>{!running && 'Not '}Running</p>
            </Message>
            <div>
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
            <Message>
                <Message.Header>Interval</Message.Header>
                <p>Runs Every {interval} Minutes</p>
            </Message>
            <div>
                <Button
                    onClick={() =>
                        dispatch({ type: BotActionTypes.increaseInterval })
                    }
                >
                    Increase
                </Button>
                <Button
                    onClick={() =>
                        dispatch({ type: BotActionTypes.decreaseInterval })
                    }
                >
                    Decrease
                </Button>
                <Input
                    onChange={(e, { value }: { value: string }) =>
                        dispatch({
                            type: BotActionTypes.setInterval,
                            interval: Number(value),
                        })
                    }
                    placeholder="Set Interval..."
                />
            </div>
        </div>
    );
};

export default Settings;
