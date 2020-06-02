import React, { useContext } from 'react';
import { Button, Input, Message } from 'semantic-ui-react';
import { BotContext } from '../../../../services/BotContext';
import { BotActionTypes } from '../../../../types/types';

const Interval = () => {
    const { dispatch, settings } = useContext(BotContext);
    const interval = settings?.interval;
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
};

export default Interval;
