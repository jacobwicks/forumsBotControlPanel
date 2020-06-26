import React, { useEffect, useCallback, useState } from 'react';
import { Loader, Message } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';
import { openFetchJSON } from '../../services/Api/services/OpenFetch';
import { Trigger } from '../../types/types';
import Instruction from './Instruction';
import TriggerInstruction from './TriggerInstruction';
import { reviver } from '../../services/JSONParseRegExReviver';

interface InstructionsResponse {
    actions: string;
    albums: AlbumInstruction[];
}

type IR = InstructionsResponse | undefined;

interface ActionInstruction {
    instructions?: string;
    key: string;
    name: string;
    triggers: Trigger[];
}

interface AlbumInstruction {
    album: string;
    description?: string;
}

const Instructions = () => {
    const [actions, setActions] = useState<any[] | undefined>(undefined);
    const [albums, setAlbums] = useState<AlbumInstruction[] | undefined>(
        undefined
    );

    const [fetching, setFetching] = useState(false);
    const [done, setDone] = useState(false);

    const getInstructions = useCallback(async () => {
        const route = 'instructions';
        const instructions = (await openFetchJSON(route)) as IR;
        const actions: ActionInstruction[] =
            instructions?.actions && JSON.parse(instructions.actions, reviver);
        const albums = instructions?.albums;

        setActions(actions);
        setAlbums(albums);

        setFetching(true);
        setDone(true);
    }, [setActions, setAlbums, setFetching, setDone]);

    useEffect(() => {
        !actions && !fetching && !done && getInstructions();
    }, [actions, fetching, done, getInstructions]);

    if (!actions && fetching) return <Loader active />;

    if (!actions && done)
        return <Message warning>Failed to load Instructions</Message>;

    return (
        <Container>
            {actions?.map(({ example, instructions, key, name, triggers }) => (
                <Instruction
                    input={instructions}
                    key={key}
                    addChildren={[
                        <TriggerInstruction
                            example={example}
                            triggers={triggers}
                        />,
                    ]}
                />
            ))}
        </Container>
    );
};

export default Instructions;
