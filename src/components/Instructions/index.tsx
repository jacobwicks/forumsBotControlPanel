import React, { useEffect, useContext, useCallback } from 'react';
import { Loader, Message } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import Instruction from './components/Instruction';
import { getInstructions, getBotName } from '../../services/Api';
import { InstructionsContext } from '../../services/InstructionsContext';
import { InstructionsActionTypes } from '../../types/types';
import ActionsInstructions from './components/ActionsInstructions';
import AlbumInstructions from './components/AlbumInstructions';

const Instructions = () => {
    const { dispatch, actions, done, fetching, failed, general } = useContext(
        InstructionsContext
    );

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

    const addChildren = [];

    addChildren.push(<AlbumInstructions key="albums" />);
    addChildren.push(<ActionsInstructions key="actions" />);

    return (
        <Container>
            {general ? (
                <Instruction
                    name=""
                    input={general}
                    addChildren={addChildren}
                    forceOpen={true}
                />
            ) : (
                <Loader active />
            )}
        </Container>
    );
};

export default Instructions;
