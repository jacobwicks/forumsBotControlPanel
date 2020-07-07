import React, { useContext } from 'react';
import { BotContext } from '../../../../services/BotContext';
import { Segment, Header } from 'semantic-ui-react';
import EditableInput from '../../../EditableInput';
import { settingsConfigKeys } from '../..';
import { BotActionTypes, BotAction } from '../../../../types/Bot';

const Signature = () => {
    const { dispatch, settings } = useContext(BotContext);

    const sigLinkInstructions = !!settings?.sigLinkInstructions;
    const sigShowText = !!settings?.sigShowText;
    const sigText = settings?.sigText || '';

    return (
        <Segment>
            <Header>Signature</Header>
            The bot signature may be added to the end of every post. <br />
            Turning on 'Link Instructions' will add a link to the bot
            instructions hosted on GitHub pages, if you have that feature turned
            on. <br />
            <EditableInput
                checkbox={true}
                configKeys={settingsConfigKeys}
                dispatch={dispatch}
                dispatchBefore={[
                    {
                        type: BotActionTypes.setSigLinkInstructions,
                    } as BotAction,
                ]}
                dispatchOnFailure={[
                    {
                        type: BotActionTypes.setSigLinkInstructions,
                        sigLinkInstructions,
                    },
                ]}
                labelText={'Link Instructions in Bot Signature'}
                input={'sigLinkInstructions'}
                value={sigLinkInstructions}
                renameValueTo={'sigLinkInstructions'}
            />
            You can add custom text to each post by the bot.
            <EditableInput
                checkbox={true}
                configKeys={settingsConfigKeys}
                dispatch={dispatch}
                dispatchBefore={[
                    { type: BotActionTypes.setSigShowText } as BotAction,
                ]}
                dispatchOnFailure={[
                    {
                        type: BotActionTypes.setSigShowText,
                        sigShowText,
                    },
                ]}
                labelText={'Show Bot Signature Text'}
                input="sigShowText"
                value={sigShowText}
                renameValueTo="sigShowText"
            />
            <EditableInput
                dispatch={dispatch}
                dispatchBefore={[
                    { type: BotActionTypes.setSigText } as BotAction,
                ]}
                dispatchOnFailure={[
                    { type: BotActionTypes.setSigText, sigText },
                ]}
                configKeys={settingsConfigKeys}
                labelText={'Bot Signature Text'}
                input={'sigText'}
                renameValueTo={'sigText'}
                value={sigText}
            />
        </Segment>
    );
};

export default Signature;
