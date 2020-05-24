import React, { useContext, useEffect } from 'react';
import {
    Button,
    Icon,
    Input,
    Label,
    Message,
    Segment,
} from 'semantic-ui-react';
import { BotContext } from '../../services/BotContext';
import { BotActionTypes, BotFetchKeys, BotAction } from '../../types';
import { loadSettings } from '../../services/Api';
import setValue from '../../services/Api/services/SetValue';

const LogViewer = () => <div>Log Viewr</div>;
//add what the bot is doing right now
//waiting,
//scanning threads - threadId#
//processing instructions
//posting - postAction

const startBot = async (dispatch: (action: BotAction) => void) => {
    const configKeys = ['settings', 'running'];
    const value = true;

    dispatch({ type: BotActionTypes.start });

    const started = await setValue({
        configKeys,
        value,
    });

    !started && dispatch({ type: BotActionTypes.stop });
};

const stopBot = async (dispatch: (action: BotAction) => void) => {
    const configKeys = ['settings', 'running'];
    const value = false;

    dispatch({ type: BotActionTypes.stop });

    const stopped = await setValue({
        configKeys,
        value,
    });

    !stopped && dispatch({ type: BotActionTypes.stop });
};

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
                        onClick={() => !running && startBot(dispatch)}
                        color="green"
                    >
                        <Icon name="play" size="large" />
                        Start
                    </Button>
                    <Button
                        onClick={() => running && stopBot(dispatch)}
                        color="red"
                    >
                        <Icon name="stop" size="large" />
                        Stop
                    </Button>
                    <Button color="blue">
                        <Icon name="play circle" size="large" />
                        Run Once
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
