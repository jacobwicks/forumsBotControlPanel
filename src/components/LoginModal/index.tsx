import React, { useContext, useState } from 'react';
import { Button, Icon, Input, Header, Modal } from 'semantic-ui-react';
import { LoginContext } from '../../services/LoginContext';
import { login } from '../../services/Api';

const LoginModal = () => {
    const { loggingIn: open, dispatch } = useContext(LoginContext);
    const [password, setPassword] = useState('');
    return (
        <Modal open={open}>
            <Header icon="lock" content="Login to see controls" />
            <Modal.Content>
                <Input
                    type="password"
                    onChange={(e, { value }: { value: string }) =>
                        setPassword(value)
                    }
                />
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
                    onClick={() => login({ userName: 'whatever', password })}
                >
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default LoginModal;
