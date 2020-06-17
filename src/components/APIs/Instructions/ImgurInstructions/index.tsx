import React, { useState, useContext } from 'react';
import { Button, Icon, Modal, Input } from 'semantic-ui-react';
import { InstructionsType, GenericInstructions } from '..';
import { ApiContext } from '../../../../services/ApiContext';
import { getImgurToken } from '../../../../services/Api/services/APIs';

const GetTokenModal = ({
    close,
    open,
}: {
    close: () => void;
    open: boolean;
}) => {
    const { dispatch } = useContext(ApiContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const disabled = !username || !password;

    return (
        <Modal closeOnDimmerClick open={open} onClose={() => close()}>
            <Modal.Header>Get Imgur Token</Modal.Header>
            <Modal.Content>
                <Input
                    label={{ content: 'Imgur Username' }}
                    onChange={({ target }) => setUsername(target.value)}
                    value={username}
                />
                <br />
                <br />
                <Input
                    label={{ content: 'Imgur Password' }}
                    onChange={({ target }) => setPassword(target.value)}
                    value={password}
                    type="pasword"
                />
            </Modal.Content>
            <Modal.Actions>
                <Button color="red">
                    <Icon name="remove" /> Cancel
                </Button>
                <Button
                    color="green"
                    disabled={disabled}
                    onClick={() =>
                        getImgurToken({
                            dispatch,
                            username,
                            password,
                        })
                    }
                >
                    <Icon name="checkmark" /> Get Token
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

const imgurInstructions: InstructionsType[] = [
    { header: 'To get the imgur api keys follow the 7 steps below.' },
    'If you already have an account with imgur, you can skip step 1.',
    '1. Register an account',
    { link: { href: 'https://imgur.com/register' } },
    '2. Log in with your account',
    { link: { href: 'https://imgur.com/signin/' } },
    '3. Register an application.',
    'Registering an application will get you the client_id and client_secret.',
    'Go to this link.',
    { link: { href: 'https://api.imgur.com/oauth2/addclient' } },
    "You'll need to log in with your imgur account if you haven't already.",
    'Type the application name. It can be anything. I suggest something like "saForumsBot".',
    'Select "OAuth 2 authorization without a callback URL"',
    'Skip the Authorization callback url and website fields.',
    'Fill in the email and description fields.',
    'Do the captcha if there is one.',
    'Click submit.',
    'Copy and paste the client_id and client_secret into the fields on this screen.',
    `The client_id is used to upload images "anonymously", meaning they don't go into one of the named albums on the account.`,
    '4. Use your imgur username and password to get the access_token',
];

const ImgurInstructions = ({ api }: { api: string }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const getTokenButton = {
        el: (
            <Button key={'ec0'} onClick={() => setModalOpen(true)}>
                Get Token
            </Button>
        ),
    };

    const extraChildren = [getTokenButton];

    return (
        <>
            <GenericInstructions
                api={api}
                extraChildren={extraChildren}
                instructions={imgurInstructions}
            />
            <GetTokenModal close={() => setModalOpen(false)} open={modalOpen} />
        </>
    );
};

export default ImgurInstructions;
