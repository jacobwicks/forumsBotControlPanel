import React, { useContext, useState, useEffect } from 'react';
import { Modal, Icon, Button, Message, Input, Popup } from 'semantic-ui-react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { createNewAlbum } from '../../../../services/Api/';

const _CreateAlbumModal = ({
    close,
    open,
}: {
    close: () => void;
    open: boolean;
}) => {
    const { album, dispatch } = useContext(AlbumsContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        close();
    }, [album]);

    return (
        <Modal closeOnDimmerClick onClose={() => close()} open={open}>
            <Modal.Header>Create New Album</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Message>
                        <Message.Header>
                            Creates a new album on Imgur and adds it to the SA
                            Bot
                        </Message.Header>
                    </Message>

                    <Input
                        label="Name"
                        onChange={(e, { value }: { value: string }) =>
                            setName(value)
                        }
                    />
                    <br />
                    <br />
                    <Input
                        label="Description"
                        onChange={(e, { value }: { value: string }) =>
                            setDescription(value)
                        }
                    />
                    <br />
                    <br />
                </Modal.Description>
                <Modal.Actions>
                    <Button onClick={() => close()}>Cancel</Button>
                    <Button
                        disabled={!name}
                        color={name ? 'green' : undefined}
                        onClick={() =>
                            createNewAlbum({
                                dispatch,
                                album: name,
                                description,
                            })
                        }
                    >
                        <Icon name="exclamation" />
                        Create Album
                    </Button>
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    );
};

const CreateAlbumModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Popup
                content="Create new album"
                trigger={
                    <Button
                        float="right"
                        icon="add"
                        onClick={() => setOpen(true)}
                    />
                }
            />
            <_CreateAlbumModal close={() => setOpen(false)} open={open} />
        </>
    );
};

export default CreateAlbumModal;
