import React, { useContext } from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import { saveInstructions } from '../../../../services/Api';

const SaveInstructionsButton = () => (
    <Popup
        content="Save instructions"
        trigger={
            <Icon
                name="save"
                size="large"
                style={{ cursor: 'pointer' }}
                onClick={() => saveInstructions()}
            />
        }
    />
);

export default SaveInstructionsButton;
