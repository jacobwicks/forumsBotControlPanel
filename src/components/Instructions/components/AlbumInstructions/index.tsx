import React, { useContext, useState } from 'react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import { Segment, Header } from 'semantic-ui-react';
import AlbumInstruction from '../AlbumInstruction';

const AlbumInstructions = () => {
    const { albums, botName } = useContext(InstructionsContext);
    const [open, setOpen] = useState(false);

    return (
        <Segment onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
            <Header as="h2">Albums</Header>
            {open && (
                <div>
                    <p>The bot stores images in albums.</p>
                    <p>
                        Get a random image from an album by posting "{botName}{' '}
                        gimme" followed by the album name
                    </p>
                    <p>
                        You can request to add the first image in your post to
                        an album by posting "{botName} add" followed by album
                        name
                    </p>
                    {albums.map((albumInstruction, index) => (
                        <AlbumInstruction
                            albumInstruction={albumInstruction}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </Segment>
    );
};

export default AlbumInstructions;
