import React, { useContext } from 'react';
import { BotContext } from '../../../../services/BotContext';
import { Loader, Segment, Header } from 'semantic-ui-react';
import EditableInput from '../../../EditableInput';
import { settingsConfigKeys } from '../..';
import { BotActionTypes, BotAction } from '../../../../types/Bot';

const BotName = () => {
    const { dispatch, settings } = useContext(BotContext);
    const botName = settings?.botName;

    if (!botName) return <Loader active />;

    return (
        <Segment>
            <Header>botName</Header>
            The botName is used by posters to instruct the bot to take actions.{' '}
            <br />
            For example, "{botName} kittyCat" instructs the bot to post a
            picture of a cat. <br />
            The botName does not have to match the account name.
            <EditableInput
                dispatch={dispatch}
                dispatchBefore={[
                    { type: BotActionTypes.setBotName } as BotAction,
                ]}
                dispatchOnFailure={[
                    { type: BotActionTypes.setBotName, botName },
                ]}
                configKeys={settingsConfigKeys}
                input={'botName'}
                renameValueTo={'botName'}
                value={botName}
            />
        </Segment>
    );
};

export default BotName;
