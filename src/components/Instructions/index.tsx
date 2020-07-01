import React, { useEffect, useContext, useCallback } from 'react';
import { Loader, Message, Grid } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import Instruction from './components/Instruction';
import { getInstructions, getBotName } from '../../services/Api';
import { InstructionsContext } from '../../services/InstructionsContext';
import { InstructionsActionTypes } from '../../types/types';
import ActionsInstructions from './components/ActionsInstructions';
import AlbumInstructions from './components/AlbumInstructions';
import User from '../User';

const Instructions = () => {
    const {
        dispatch,
        actions,
        bot,
        done,
        fetching,
        failed,
        general,
        threads,
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

    const addChildren = [];

    //addChildren.push(<AlbumInstructions key="albums" />);
    //addChildren.push(<ActionsInstructions key="actions" />);

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
                            {threads.map((thread, index) => (
                                <div key={index}>
                                    <a
                                        href={thread.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {thread.title}
                                    </a>
                                </div>
                            ))}
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
