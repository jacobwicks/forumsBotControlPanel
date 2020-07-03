import React, { useContext } from 'react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import { Segment, Header } from 'semantic-ui-react';
import { ActionInstruction } from '../../../../types/types';
import Instruction from '../Instruction';
import { Trigger } from '../../../../types/types';
import RegexTriggerDisplay from '../RegexTriggerDisplay';

const AlbumTriggersInstruction = ({
    album,
    description,
    example,
    triggers,
}: {
    album: string;
    description?: string;
    example?: string;
    triggers: Trigger[];
}) => {
    const { botName } = useContext(InstructionsContext);
    const hasRegex = triggers.some((trigger) => trigger instanceof RegExp);

    const stringChildren = triggers
        .filter((trigger) => !(trigger instanceof RegExp))
        .map((trigger, key) => (
            <Segment key={key}>
                <div>
                    {botName} {trigger} {album}
                </div>
            </Segment>
        ));

    return (
        <>
            <Header as="h4">
                {album} {description ? `- ${description}` : ''}
            </Header>
            {hasRegex && (
                <RegexTriggerDisplay
                    album={album}
                    input={example}
                    triggers={triggers}
                />
            )}
            {stringChildren}
        </>
    );
};

//instruction for an action that deals with albums
const AlbumActionInstruction = ({
    actionInstruction,
}: {
    actionInstruction: ActionInstruction;
}) => {
    const { albums } = useContext(InstructionsContext);

    const { example, instructions, key, name, triggers } = actionInstruction;

    const addChildren = !!albums.length
        ? albums.map(({ album, description }, key) => (
              <AlbumTriggersInstruction
                  key={key}
                  album={album}
                  description={description}
                  example={example}
                  triggers={triggers}
              />
          ))
        : [
              <AlbumTriggersInstruction
                  key="placeholder"
                  album={'example'}
                  description={
                      'This bot has no active albums. This placeholder is here as an example'
                  }
                  example={example}
                  triggers={triggers}
              />,
          ];

    return (
        <Instruction
            addChildren={addChildren}
            input={instructions || ''}
            key={key}
            name={name}
        />
    );
};

export default AlbumActionInstruction;
