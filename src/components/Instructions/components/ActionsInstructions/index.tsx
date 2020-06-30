import React, { useContext } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import TriggerInstruction from '../TriggerInstruction';
import Instruction from '../Instruction';

const ActionsInstructions = () => {
    const { actions } = useContext(InstructionsContext);

    return (
        <Segment>
            <Header as="h2">Actions</Header>
            {actions?.map(({ example, instructions, key, name, triggers }) => (
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
            ))}
        </Segment>
    );
};

export default ActionsInstructions;
