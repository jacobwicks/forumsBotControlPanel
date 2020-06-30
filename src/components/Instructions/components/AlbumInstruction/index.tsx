import React, { useContext, useState } from 'react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import { Segment, Header } from 'semantic-ui-react';
import { spacing } from '../../../../services/Spacing';
import { AlbumInstruction as AlbumInstructionType } from '../../../../types/types';

const AlbumInstruction = ({
    albumInstruction,
}: {
    albumInstruction: AlbumInstructionType;
}) => {
    const { botName } = useContext(InstructionsContext);
    const [open, setOpen] = useState(false);

    const { album, description } = albumInstruction;
    return (
        <Segment
            onClick={(e: any) => {
                e.stopPropagation();
                setOpen(!open);
            }}
            style={{ cursor: 'pointer' }}
        >
            <Header as="h3">{album}</Header>
            {open && (
                <div>
                    <div style={spacing}>{description}</div>
                    <Segment>
                        <Header as="h4">
                            Request to add first image in post or first image in
                            quoted post to album {album}
                        </Header>
                        <div>
                            {botName} add {album}
                        </div>
                        <div>
                            {botName} add to {album}
                        </div>
                    </Segment>
                    <Segment>
                        <Header as="h4">Get random image from {album}</Header>
                        <div>
                            {botName} gimme {album}
                        </div>
                        <div>
                            {botName} gimme a {album}
                        </div>
                    </Segment>
                </div>
            )}
        </Segment>
    );
};

export default AlbumInstruction;
