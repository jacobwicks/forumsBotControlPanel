import React, { useContext, useState } from 'react';
import { Button, Input, Message } from 'semantic-ui-react';
import { BotContext } from '../../../../services/BotContext';
import { BotActionTypes } from '../../../../types/types';
import { setBotInterval } from '../../../../services/Api';

const Interval = () => {
    const { dispatch, settings } = useContext(BotContext);
    const interval = settings?.interval;
    const [priorValue, setPriorValue] = useState<number | undefined>(undefined);

    return (
        <React.Fragment>
            <Message>
                <Message.Header>Interval</Message.Header>
                <p>Runs Every {interval} Minutes</p>
            </Message>
            <div>
                <Button
                    onClick={async () => {
                        if (interval) {
                            if (!priorValue) {
                                setPriorValue(interval);
                            }

                            //increases interval in context
                            dispatch({ type: BotActionTypes.increaseInterval });

                            const increased = await setBotInterval(
                                interval + 1
                            );

                            console.log(`setBotInterval returned`, increased);
                            // !increased &&
                            //     dispatch({
                            //         type: BotActionTypes.setInterval,
                            //         interval,
                            //     });
                        }
                    }}
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
