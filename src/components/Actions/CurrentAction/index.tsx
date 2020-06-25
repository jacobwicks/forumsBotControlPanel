import React, { useContext, useState, useEffect } from 'react';
import { Segment, Header, Label, Popup, Icon, Loader } from 'semantic-ui-react';
import {
    Trigger as TriggerType,
    ActionsActionTypes,
} from '../../../types/types';
import { ActionsContext } from '../../../services/ActionsContext';
import EditableInput from '../../EditableInput';
import Instructions from '../Instructions';
import { spacing } from '../../../services/Spacing';
import TriggerInstruction from '../TriggerInstruction';
import setValue from '../../../services/Api/services/SetValue';

const actionsConfigKeys = ['actions'];

const NoAction = () => (
    <Segment>
        <Header>No Action Selected</Header>
    </Segment>
);

const TriggerStringInput = ({
    index,
    trigger,
}: {
    index: number;
    trigger: string;
}) => {
    const { dispatch, action, actions } = useContext(ActionsContext);
    const [open, setOpen] = useState<boolean>(false);

    const triggersLength = action && actions[action].triggers.length;

    useEffect(() => {
        setOpen(false);
    }, [triggersLength, setOpen]);

    if (!action) return <Loader active />;

    const triggersKeys = ['actions', action, 'triggers'];
    const configKeys = [...triggersKeys, index.toString()];

    const callback = async (value: string) => {
        const oldValue = actions[action];
        let triggers = [...oldValue.triggers];
        triggers.splice(index, 1, value);

        const newValue = { ...oldValue, triggers };

        dispatch({
            type: ActionsActionTypes.setAction,
            key: action,
            value: newValue,
        });

        const result = await setValue({
            configKeys,
            value,
        });

        if (!result)
            dispatch({
                type: ActionsActionTypes.setAction,
                key: action,
                value: oldValue,
            });
    };

    const deleteTrigger = async () => {
        const oldValue = actions[action];
        let triggers = [...oldValue.triggers];
        triggers.splice(index, 1);

        const newValue = { ...oldValue, triggers };

        dispatch({
            type: ActionsActionTypes.setAction,
            key: action,
            value: newValue,
        });

        const result = await setValue({
            configKeys: triggersKeys,
            value: triggers,
        });

        if (!result)
            dispatch({
                type: ActionsActionTypes.setAction,
                key: action,
                value: oldValue,
            });
    };

    return (
        <div style={spacing}>
            <EditableInput
                callback={callback}
                configKeys={configKeys}
                input={index.toString()}
                tellParentOpen={(open) => setOpen(open)}
                value={trigger}
            />
            {open && (
                <Popup
                    content={`Delete trigger ${index} from ${action}`}
                    trigger={
                        <Icon
                            name="trash"
                            onClick={() => deleteTrigger()}
                            size="large"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                />
            )}
        </div>
    );
};

const Trigger = ({ index, trigger }: { index: number; trigger: TriggerType }) =>
    trigger instanceof RegExp ? (
        <div style={spacing}>
            <Label>RegEx:</Label> {trigger.toString()}
        </div>
    ) : (
        <TriggerStringInput index={index} trigger={trigger} />
    );

const Triggers = ({ triggers }: { triggers: TriggerType[] }) => (
    <Segment>
        <Header as="h2">Triggers</Header>
        <div style={spacing}>
            {triggers.map((trigger, index) => (
                <Trigger key={index} index={index} trigger={trigger} />
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
