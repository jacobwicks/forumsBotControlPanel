import React, { useState } from 'react';
import BotStateDisplay from '../BotStateDisplay';
import Interval from '../Interval';

const BotStateContainer = () => {
    const [minutes, setMinutes] = useState<number | undefined>(undefined);
    const [seconds, setSeconds] = useState<number | undefined>(undefined);

    //     1. the value of the interval
    // 2. the time left on the timer, updated

    return (
        <>
            <BotStateDisplay />
            <Interval />
        </>
    );
};

export default BotStateContainer;
