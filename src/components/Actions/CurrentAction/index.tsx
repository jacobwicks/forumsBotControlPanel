import React, { useContext } from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import {
    Trigger as TriggerType,
    ActionsActionTypes,
} from '../../../types/types';
import { ActionsContext } from '../../../services/ActionsContext';
import EditableInput from '../../EditableInput';
import Instructions from '../Instructions';
import { spacing } from '../../../services/Spacing';
import TriggerInstruction from '../TriggerInstruction';

const actionsConfigKeys = ['actions'];

const NoAction = () => (
    <Segment>
        <Header>No Action Selected</Header>
    </Segment>
);

const Trigger = ({ trigger }: { trigger: TriggerType }) =>
    trigger instanceof RegExp ? (
        <div style={spacing}>
            <Label>RegEx:</Label> {trigger.toString()}
        </div>
    ) : (
        <div style={spacing}>
            <Label>String:</Label> {trigger}
        </div>
    );

const Triggers = ({ triggers }: { triggers: TriggerType[] }) => (
    <Segment>
        <Header as="h2">Triggers</Header>
        <div style={spacing}>
            {triggers.map((trigger, index) => (
                <Trigger key={index} trigger={trigger} />
            ))}
        </div>
    </Segment>
);
// const replacer = (key: string, value: any) => {
//     if (value instanceof RegExp) return value.toString();
//     else return value;
// };

//set limits? nah
//set last read
//probably want to track pages to set last read
const CurrentAction = () => {
    const { dispatch, action, actions } = useContext(ActionsContext);

    const currentAction = action && actions[action];
    if (!currentAction) return <NoAction />;

    const { active, name, triggers } = currentAction;

    const configKeys = [...actionsConfigKeys, action as string];

    return (
        <>
            <Instructions
                action={action as string}
                addChildren={[<TriggerInstruction triggers={triggers} />]}
            />
            {/* <Header as="h2">{name}</Header> */}
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
            <Triggers triggers={triggers} />
        </>
    );
};

export default CurrentAction;
