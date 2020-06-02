import React, { useContext, useEffect } from 'react';
import { BotContext } from '../../services/BotContext';
import loadAPIs from '../../services/Api/services/APIs';
import { BotFetchKeys } from '../../types/types';

const APIs = () => {
    const { dispatch, hasFailed, fetching, APIs } = useContext(BotContext);

    useEffect(() => {
        !fetching.includes(BotFetchKeys.APIs) &&
            !hasFailed.includes(BotFetchKeys.APIs) &&
            !APIs &&
            loadAPIs(dispatch);
    }, [dispatch, fetching, hasFailed, APIs]);

    return (
        <div>
            {APIs &&
                Object.keys(APIs).map((API, index) => (
                    <div key={index}>{API}</div>
                ))}
        </div>
    );
};

export default APIs;
