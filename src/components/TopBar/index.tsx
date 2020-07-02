import React, { useContext, useState, useEffect } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import LoginModal from '../LoginModal';
import { getBotName } from '../../services/Api';
import { BotFetchKeys } from '../../types/types';
import { BotContext } from '../../services/BotContext';
import { InstructionsContext } from '../../services/InstructionsContext';
import ControlPanelLink from './components/ControlPanelLink';
import SaveInstructionsButton from './components/SaveInstructionsButton';

const Title = () => {
    const { fetching, settings } = useContext(BotContext);
    const { botName: instructionsBotName } = useContext(InstructionsContext);
    const [botName, setBotName] = useState(
        instructionsBotName
            ? instructionsBotName
            : settings?.botName
            ? settings.botName
            : ''
    );
    const [botNameFetching, setBotNameFetching] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);

    useEffect(() => {
        if (settings) {
            setBotName(settings.botName);
        } else if (
            !botName &&
            !fetching.includes(BotFetchKeys.settings) &&
            !botNameFetching &&
            !hasFailed
        ) {
            _getBotName();
        }
    }, [botName, fetching, botNameFetching, hasFailed, settings]);

    const _getBotName = async () => {
        setBotNameFetching(true);
        const botName = await getBotName();
        setBotNameFetching(false);

        botName ? setBotName(botName) : setHasFailed(true);
    };

    return <Header size="large" content={`${botName}, an SA Forums Bot`} />;
};

const menuItems = [
    <ControlPanelLink />,
    <Title />,
    <SaveInstructionsButton />,
].map((element, index) => <Menu.Item key={index}>{element}</Menu.Item>);

const TopBar = () => (
    <>
        <Menu children={menuItems} color="green" inverted />
        <LoginModal />
    </>
);

export default TopBar;
