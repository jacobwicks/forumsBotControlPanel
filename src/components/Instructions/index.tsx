import React, { useEffect, useContext, useCallback } from 'react';
import { Loader, Message } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import Instruction from './components/Instruction';
import TriggerInstruction from './components/TriggerInstruction';
import { getInstructions, getBotName } from '../../services/Api';
import { InstructionsContext } from '../../services/InstructionsContext';
import { InstructionsActionTypes } from '../../types/types';

const Instructions = () => {
    const {
        dispatch,
        actions,
        albums,
        done,
        fetching,
        failed,
        general,
    } = useContext(InstructionsContext);

    useEffect(() => {
        !fetching && !done && !failed && getInstructions(dispatch);
    }, [actions, dispatch, done, failed, fetching]);

    const loadBotName = useCallback(async () => {
        const botName = await getBotName();
        botName &&
            dispatch({ type: InstructionsActionTypes.setBotName, botName });
    }, [dispatch]);

    useEffect(() => {
        loadBotName();
    }, [loadBotName]);

    if (!actions && fetching) return <Loader active />;

    if (!actions && done)
        return <Message warning>Failed to load Instructions</Message>;

    const addChildren = actions?.map(
        ({ example, instructions, key, name, triggers }) => (
            <Instruction
                input={instructions || ''}
                key={key}
                addChildren={[
                    <TriggerInstruction
                        example={example}
                        triggers={triggers}
                    />,
                ]}
            />
        )
    );

    return (
        <Container>
            {general ? (
                <Instruction input={general} addChildren={addChildren} />
            ) : (
                <Loader active />
            )}
        </Container>
    );
};

export default Instructions;
