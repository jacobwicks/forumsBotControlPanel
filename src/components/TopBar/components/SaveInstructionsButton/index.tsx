import React, { useContext } from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import { saveInstructions } from '../../../../services/Api';

const SaveInstructionsButton = () => {
    const { actions, albums, bot, botName, general, threads } = useContext(
        InstructionsContext
    );

    const saveableInstructions = {
        actions,
        albums,
        bot,
        botName,
        general,
        threads,
    };

    return (
        <Popup
            content="Save instructions"
            trigger={
                <Icon
                    name="save"
                    size="large"
                    style={{ cursor: 'pointer' }}
                    onClick={() => saveInstructions(saveableInstructions)}
                />
            }
        />
    );
};

export default SaveInstructionsButton;
