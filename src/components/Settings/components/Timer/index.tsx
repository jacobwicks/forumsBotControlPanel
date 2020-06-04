import React, { useState, useEffect, useContext } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { BotContext } from '../../../../services/BotContext';
import { BotActionTypes } from '../../../../types/Bot';

const dummy = {
    running: false,
    interval: 0,
    on: false,
};

const Timer = () => {
    const { dispatch, settings, timer } = useContext(BotContext);
    const { minutes, seconds } = timer;
    const { interval, on, running } = settings || dummy;

    useEffect(() => {
        dispatch({
            type: BotActionTypes.setTimer,
            timer: {
                minutes: interval,
                seconds: 0,
            },
        });
    }, [on, interval]);

    useEffect(() => {
        if (on) {
            let myInterval = setInterval(() => {
                if (seconds > 0) {
                    dispatch({
                        type: BotActionTypes.setTimer,
                        timer: {
                            minutes,
                            seconds: seconds - 1,
                        },
                    });
                }

                if (seconds === 0) {
                    if (minutes === 0) {
                        myInterval && clearInterval(myInterval);
                    } else {
                        dispatch({
                            type: BotActionTypes.setTimer,
                            timer: {
                                minutes: minutes - 1,
                                seconds: 59,
                            },
                        });
                    }
                }
            }, 1000);

            return () => {
                clearInterval(myInterval);
            };
        }
    }, [dispatch, minutes, seconds, on]);

    const noTime = minutes === 0 && seconds === 0;

    const getColor = () => {
        if (on && noTime) return 'lightBlue';
        if (on) return 'red';
        return 'gray';
    };

    return (
        <Segment style={{ backgroundColor: 'black', width: 120 }}>
            <Header as="h1" style={{ color: getColor() }}>
                {noTime
                    ? '00:00'
                    : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </Header>
        </Segment>
    );
};

export default Timer;
