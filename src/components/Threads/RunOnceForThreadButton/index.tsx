import React, { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { BotContext } from '../../../services/BotContext';
import { runOnceForThread } from '../../../services/Api';
import RotatingCog from '../../RotatingCog';

const RunOnceForThreadButton = ({ threadId }: { threadId: number }) => {
    const { dispatch, settings } = useContext(BotContext);
    const running = !!settings?.running;
    return (
        <Button
            color="blue"
            onClick={() =>
                !running &&
                runOnceForThread({
                    dispatch,
                    threadId,
                })
            }
        >
            {running ? (
                <RotatingCog size="large" />
            ) : (
                <Icon name="play circle" size="large" />
            )}
            {running ? 'Running' : 'Run Once For This Thread'}
        </Button>
    );
};

export default RunOnceForThreadButton;
