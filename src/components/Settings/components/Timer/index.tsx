import React, { useState, useEffect, useContext } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { BotContext } from '../../../../services/BotContext';

const dummy = {
    running: false,
    interval: 0,
    on: false,
};

const Timer2 = ({
    minutes,
    seconds,
    setMinutes,
    setSeconds,
}: {
    minutes: number;
    seconds: number;
    setMinutes: (arg: number) => void;
    setSeconds: (arg: number) => void;
}) => {
    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    myInterval && clearInterval(myInterval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <Segment style={{ backgroundColor: 'black' }}>
            <Header as="h1" style={{ color: 'red' }}>
                {minutes === 0 && seconds === 0
                    ? '00:00'
                    : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </Header>
        </Segment>
    );
};

const Timer = () => {
    const { settings } = useContext(BotContext);
    const { interval, on, running } = settings || dummy;

    const [minutes, setMinutes] = useState(interval);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        setMinutes(interval);
        setSeconds(0);
    }, [on, interval, setMinutes, setSeconds]);

    return on && !running ? (
        <Timer2
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
        />
    ) : (
        <Segment style={{ backgroundColor: 'black' }}>
            <Header as="h1" style={{ color: 'gray' }}>
                {minutes === 0 && seconds === 0
                    ? '00:00'
                    : `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
            </Header>
        </Segment>
    );
};
export default Timer;
