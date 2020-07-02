import React, { useContext } from 'react';
import { LoginContext } from '../../../../services/LoginContext';
import { LoginActionTypes } from '../../../../types/Login';
import { logout } from '../../../../services/Api';
import { Icon } from 'semantic-ui-react';

const ControlPanelLink = () => {
    const { dispatch, isLoggedIn } = useContext(LoginContext);
    return isLoggedIn ? (
        <Icon
            title="Bot Instructions Page"
            name="file outline"
            link
            onClick={() => logout(dispatch)}
            size="large"
        />
    ) : (
        <Icon
            title="Bot Control Panel"
            name="setting"
            link
            onClick={() => dispatch({ type: LoginActionTypes.openModal })}
            size="large"
        />
    );
};

export default ControlPanelLink;
