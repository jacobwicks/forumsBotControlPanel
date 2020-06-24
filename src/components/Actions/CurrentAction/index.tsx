import React, { useContext } from 'react';
import { Segment, Header, Label } from 'semantic-ui-react';
import { Trigger as TriggerType } from '../../../types/types';
import { ActionsContext } from '../../../services/ActionsContext';
import EditableInput from '../../EditableInput';

const spacing = { marginTop: 10, marginBottom: 10 };

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
    const { action, actions } = useContext(ActionsContext);

    const currentAction = action && actions[action];
    if (!currentAction) return <NoAction />;

    const { active, name, triggers } = currentAction;

    return (
        <>
            <Header as="h2">{name}</Header>
            <EditableInput
                checkbox={true}
                configKeys={actionsConfigKeys}
                input={'active'}
                value={active}
            />
            <Triggers triggers={triggers} />
        </>
    );
};

export default CurrentAction;
