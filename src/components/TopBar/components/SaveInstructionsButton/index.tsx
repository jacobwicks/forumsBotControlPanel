import React, { useContext, useState } from 'react';
import { Popup, Icon } from 'semantic-ui-react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import { saveInstructions } from '../../../../services/Api';

const SaveInstructionsButton = () => {
    const [saving, setSaving] = useState(false);
    const [failed, setFailed] = useState(false);

    return (
        <Popup
            content={
                saving
                    ? 'Saving Instructions'
                    : failed
                    ? 'Error saving'
                    : 'Save instructions'
            }
            trigger={
                <Icon
                    loading={saving}
                    name={failed ? 'exclamation circle' : 'save'}
                    size="large"
                    style={{ cursor: saving ? undefined : 'pointer' }}
                    onClick={async () => {
                        if (!saving) {
                            setSaving(true);
                            const saved = await saveInstructions();
                            setSaving(false);
                            !saved && setFailed(true);
                        }
                    }}
                />
            }
        />
    );
};
export default SaveInstructionsButton;
