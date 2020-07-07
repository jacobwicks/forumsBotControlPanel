import React, { useContext } from 'react';
import { Header } from 'semantic-ui-react';
import { ActionsActionTypes } from '../../../../types/types';
import { ActionsContext } from '../../../../services/ActionsContext';
import EditableInput from '../../../EditableInput';
import Instructions from '../Instructions';
import TriggerInstruction from '../TriggerInstruction';
import Triggers from './components/Triggers';

const actionsConfigKeys = ['actions'];

const NoAction = () => (
    <div>
        <Header as="h2">No Action Selected</Header>
        Actions are things that the bot can do when it receives an instruction.
        <br />
        The bot receives instructions by reading posts.
        <br />
        A post that begins with the botName is an instruction.
        <br />
        An instruction that matches an action trigger will trigger that action.
        <br />
        Most actions will cause the bot to make a post.
        <br />
        <a
            href="https://jacobwicks.github.io/2020/07/02/write-forums-bot-action.html"
            target="_blank"
            rel="noopener noreferrer"
        >
            You can make new actions and add them to the bot.
        </a>
    </div>
);

const CurrentAction = () => {
    const { dispatch, action, actions } = useContext(ActionsContext);

    const currentAction = action && actions[action];
    if (!currentAction) return <NoAction />;

    const { active, triggers } = currentAction;

    const configKeys = [...actionsConfigKeys, action as string];

    return (
        <>
            <Instructions
                action={action as string}
                addChildren={[<TriggerInstruction triggers={triggers} />]}
            />
            <EditableInput
                checkbox={true}
                configKeys={configKeys}
                dispatch={dispatch}
                dispatchBefore={[
                    {
                        type: ActionsActionTypes.setActive,
                        key: action as string,
                    } as any,
                ]}
                dispatchOnFailure={[
                    {
                        type: ActionsActionTypes.setActive,
                        key: action as string,
                        value: active,
                    } as any,
                ]}
                input={'active'}
                value={active}
            />
            <Triggers action={action as string} triggers={triggers} />
        </>
    );
};

export default CurrentAction;
