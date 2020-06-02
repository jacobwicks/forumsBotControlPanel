import React, { useContext } from 'react';
import { BotContext } from '../../../../services/BotContext';
import { Icon, Message, Label } from 'semantic-ui-react';
import { motion } from 'framer-motion';

const BotStateDisplay = () => {
    const { settings } = useContext(BotContext);
    const on = !!settings?.on;
    const running = !!settings?.running;

    return (
        <Message>
            <Message.Header>Bot State</Message.Header>
            <Label color={running ? 'blue' : on ? 'green' : 'red'} size="huge">
                <div>
                    {running ? (
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 2,
                                ease: 'easeInOut',
                                times: [0, 0.2, 0.5, 0.8, 1],
                                loop: Infinity,
                                repeatDelay: 1,
                            }}
                        >
                            <Icon size="huge" name="cog" />
                        </motion.div>
                    ) : (
                        <Icon size="huge" name={on ? 'play' : 'stop'} />
                    )}
                </div>
                {running ? 'On' : on ? 'Idle' : 'Off'}
            </Label>
        </Message>
    );
};

export default BotStateDisplay;
