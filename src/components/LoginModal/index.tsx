import React, { useContext } from 'react';
import { Button, Icon, Header, Modal } from 'semantic-ui-react';
import { LoginContext } from '../../services/LoginContext';

const LoginModal = () => {
    const { loggingIn: open, dispatch } = useContext(LoginContext);
    return (
        <Modal open={open}>
            <Header icon="lock" content="Login to see controls" />
            <Modal.Content>
                <p>Login with correct credentials?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    basic
                    color="red"
                    onClick={() => dispatch({ type: 'logout' })}
                >
                    <Icon name="remove" /> No
                </Button>
                <Button
                    color="green"
                    onClick={() => dispatch({ type: 'login' })}
                >
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default LoginModal;
