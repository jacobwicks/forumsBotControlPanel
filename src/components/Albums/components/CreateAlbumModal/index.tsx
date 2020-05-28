import React, { useContext, useState, useEffect } from 'react';
import { Modal, Icon, Button, Message, Input, Popup } from 'semantic-ui-react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { createNewAlbum } from '../../../../services/Api/';
import addExistingAlbum from '../../../../services/Api/services/Albums/AddExistingAlbum';

const _AddExistingAlbumModal = ({
    showCreateNew,
    close,
    open,
}: {
    showCreateNew: () => void;
    close: () => void;
    open: boolean;
}) => {
    const { dispatch } = useContext(AlbumsContext);
    const [hash, setHash] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Modal closeOnDimmerClick onClose={() => close()} open={open}>
            <Modal.Header>
                Add existing Imgur Album{' '}
                <Button
                    floated="right"
                    onClick={(e) => {
                        //bubbling will click the dimmer after the other modal renders
                        //the other modal is smaller, so it will think the click was outside of it
                        //and trigger close
                        e.preventDefault();

                        showCreateNew();
                    }}
                >
                    Create New Album
                </Button>
            </Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Message>
                        <Message.Header>
                            Enter a name and the hash of an existing Imgur album
                            to add it to the bot.
                        </Message.Header>
                    </Message>
                    <Input
                        label="Hash"
                        onChange={(e, { value }: { value: string }) =>
                            setHash(value)
                        }
                    />
                    <br />
                    <br />
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
                        disabled={!name || !hash}
                        color={name ? 'green' : undefined}
                        onClick={() =>
                            addExistingAlbum({
                                dispatch,
                                album: name,
                                description,
                                hash,
                            })
                        }
                    >
                        <Icon name="add" />
                        Add Album
                    </Button>
                </Modal.Actions>
            </Modal.Content>
        </Modal>
    );
};
const _CreateAlbumModal = ({
    addExisting,
    close,
    open,
}: {
    addExisting: () => void;
    close: () => void;
    open: boolean;
}) => {
    const { dispatch } = useContext(AlbumsContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Modal closeOnDimmerClick onClose={() => close()} open={open}>
            <Modal.Header>
                Create New Album{' '}
                <Button floated="right" onClick={() => addExisting()}>
                    Add Existing Album
                </Button>
            </Modal.Header>
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
    const { album, dispatch } = useContext(AlbumsContext);
    const [open, setOpen] = useState(false);
    const [addExisting, setAddExisting] = useState(false);

    //close when album changes
    useEffect(() => {
        setOpen(false);
        setAddExisting(false);
    }, [album]);

    return (
        <>
            <Popup
                content="Create new album or Add existing album"
                trigger={
                    <Button
                        float="right"
                        icon="add"
                        onClick={() => setOpen(true)}
                    />
                }
            />
            {addExisting ? (
                <_AddExistingAlbumModal
                    showCreateNew={() => setAddExisting(false)}
                    close={() => {
                        console.log('add existing setting open to false');
                        setOpen(false);
                    }}
                    open={open}
                />
            ) : (
                <_CreateAlbumModal
                    addExisting={() => setAddExisting(true)}
                    close={() => {
                        console.log('create album setting open to false');
                        setOpen(false);
                    }}
                    open={open}
                />
            )}
        </>
    );
};

export default CreateAlbumModal;
