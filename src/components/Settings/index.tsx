import React, { useContext, useEffect } from 'react';
import {
    Button,
    Header,
    Icon,
    Input,
    Label,
    Message,
    Segment,
} from 'semantic-ui-react';
import { BotContext } from '../../services/BotContext';
import { BotActionTypes, BotFetchKeys } from '../../types';
import { loadSettings } from '../../services/Api';

const LogViewer = () => <div>Log Viewr</div>;
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
        !fetching.includes(BotFetchKeys.settings) &&
            !hasFailed.includes(BotFetchKeys.settings) &&
            !settings &&
            loadSettings(dispatch);
    }, [dispatch, fetching, hasFailed, settings]);

    return (
        <div>
            <Segment>
                <Message>
                    <Message.Header>Bot State</Message.Header>
                    <Label color={running ? 'green' : 'red'} size="huge">
                        <Icon size="huge" name={running ? 'play' : 'stop'} />
                        {running ? 'On' : 'Off'}
                    </Label>
                </Message>
                <div>
                    <Button
                        onClick={() => dispatch({ type: BotActionTypes.start })}
                        color="green"
                    >
                        <Icon name="play" size="large" />
                        On
                    </Button>
                    <Button
                        onClick={() => dispatch({ type: BotActionTypes.stop })}
                        color="red"
                    >
                        <Icon name="stop" size="large" />
                        Off
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
            </Segment>
            <Segment>
                <LogViewer />
            </Segment>
        </div>
    );
};

export default Settings;
