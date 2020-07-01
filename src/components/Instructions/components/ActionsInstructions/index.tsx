import React, { useContext } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import TriggerInstruction from '../TriggerInstruction';
import Instruction from '../Instruction';
import AlbumActionInstruction from '../AlbumActionInstruction';

const ActionsInstructions = () => {
    const { actions } = useContext(InstructionsContext);

    const albumActions = actions.filter((action) => action.albums);
    const notAlbumActions = actions.filter((action) => !action.albums);

    return (
        <Segment>
            <Header as="h2">Actions - click for description</Header>
            {albumActions.map((actionInstruction) => (
                <AlbumActionInstruction actionInstruction={actionInstruction} />
            ))}
            {notAlbumActions?.map(
                ({ example, instructions, key, name, triggers }) => (
                    <Instruction
                        input={instructions || ''}
                        key={key}
                        name={name}
                        addChildren={[
                            <TriggerInstruction
                                example={example}
                                triggers={triggers}
                            />,
                        ]}
                    />
                )
            )}
        </Segment>
    );
};

export default ActionsInstructions;
