import React, { useContext } from 'react';
import { Header, Icon, Menu } from 'semantic-ui-react';
import { botName } from '../../config.json';
import { LoginContext } from '../../services/LoginContext';
import LoginModal from '../LoginModal';

const ControlPanelLink = () => {
    const { dispatch } = useContext(LoginContext);
    return (
        <Icon
            name="setting"
            link
            onClick={() => dispatch({ type: 'openLoginModal' })}
            size="large"
        />
    );
};

const Title = () => (
    <Header size="large" content={`${botName}, an SA Forums Bot`} />
);

const menuItems = [
    <ControlPanelLink />,
    <Title />,
    <LoginModal />,
].map((element, index) => <Menu.Item key={index}>{element}</Menu.Item>);

const TopBar = () => <Menu children={menuItems} color="green" inverted />;

export default TopBar;
