import React, { useEffect, useContext, useCallback } from 'react';
import { Loader, Message, Grid } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import Instruction from './components/Instruction';
import { getInstructions, getBotName } from '../../services/Api';
import { InstructionsContext } from '../../services/InstructionsContext';
import { InstructionsActionTypes } from '../../types/types';
import User from '../User';
import Threads from './components/Threads';
import ActionsInstructions from './components/ActionsInstructions';

const Instructions = () => {
    const {
        dispatch,
        actions,
        bot,
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

    return (
        <Grid>
            <Grid.Column width={3}>{bot && <User {...bot} />}</Grid.Column>
            <Grid.Column width={13}>
                <Container>
                    {general ? (
                        <>
                            <Instruction
                                name=""
                                input={general}
                                forceOpen={true}
                            />
                            <Threads />
                            <ActionsInstructions />
                        </>
                    ) : (
                        <Loader active />
                    )}
                </Container>
            </Grid.Column>
        </Grid>
    );
};

export default Instructions;
