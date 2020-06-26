import React, { useContext, useState, useEffect } from 'react';
import {
    Segment,
    Header,
    Label,
    Popup,
    Icon,
    Loader,
    Button,
} from 'semantic-ui-react';
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
import { regExpPrefix, reviver } from '../../../services/JSONParseRegExReviver';

const actionsConfigKeys = ['actions'];

const NoAction = () => (
    <Segment>
        <Header>No Action Selected</Header>
    </Segment>
);

const TriggerRegExpInput = ({
    index,
    trigger,
}: {
    index: number;
    trigger: RegExp;
}) => {
    const { dispatch, action, actions } = useContext(ActionsContext);
    const [open, setOpen] = useState(false);
    const [changing, setChanging] = useState(false);

    if (!action) return <Loader active />;

    const callback = async (value: string) => {
        if (changing) return;
        const oldValue = actions[action];

        //store it in the API as a string with the regExpPrefix Added
        const regExpValue = `${regExpPrefix}${value}`;

        const revivedValue = reviver('', regExpValue);

        let triggers = [...oldValue.triggers];
        triggers.splice(index, 1, revivedValue);

        const newValue = { ...oldValue, triggers };

        dispatch({
            type: ActionsActionTypes.setAction,
            key: action,
            value: newValue,
        });

        const result = await setValue({
            configKeys,
            value: regExpValue,
        });

        if (!result)
            dispatch({
                type: ActionsActionTypes.setAction,
                key: action,
                value: oldValue,
            });
    };

    const triggersKeys = ['actions', action, 'triggers'];
    const configKeys = [...triggersKeys, index.toString()];

    const changeTrigger = async () => {
        setChanging(true);
        const oldValue = actions[action];

        try {
            let triggers = [...oldValue.triggers];
            triggers.splice(index, 1, trigger.toString());

            const newValue = { ...oldValue, triggers };

            dispatch({
                type: ActionsActionTypes.setAction,
                key: action,
                value: newValue,
            });

            const result = await setValue({
                configKeys,
                value: trigger.toString(),
            });

            if (!result)
                dispatch({
                    type: ActionsActionTypes.setAction,
                    key: action,
                    value: oldValue,
                });

            setChanging(false);
        } catch (err) {
            console.error(err);
        }
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
                labelText={'RegExp'}
                labelColor={'blue'}
                tellParentOpen={(open) => setOpen(open)}
                value={trigger.toString()}
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
            {open && (
                <Popup
                    content={`Change to string`}
                    trigger={
                        <Icon
                            name="text height"
                            onClick={() => changeTrigger()}
                            size="large"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                />
            )}
        </div>
    );
};

const TriggerStringInput = ({
    index,
    trigger,
}: {
    index: number;
    trigger: string;
}) => {
    const { dispatch, action, actions } = useContext(ActionsContext);
    const [open, setOpen] = useState<boolean>(false);
    const [changing, setChanging] = useState(false);

    const triggersLength = action && actions[action].triggers.length;

    useEffect(() => {
        setOpen(false);
    }, [triggersLength, setOpen]);

    if (!action) return <Loader active />;

    const triggersKeys = ['actions', action, 'triggers'];
    const configKeys = [...triggersKeys, index.toString()];

    const callback = async (value: string) => {
        if (changing) return;
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

    const changeTrigger = async () => {
        setChanging(true);
        const oldValue = actions[action];

        //store it in the API as a string with the regExpPrefix Added
        const regExpValue = `${regExpPrefix}${trigger}`;

        try {
            const revivedValue = reviver('', regExpValue);

            console.log(revivedValue);

            let triggers = [...oldValue.triggers];
            triggers.splice(index, 1, revivedValue);

            const newValue = { ...oldValue, triggers };

            dispatch({
                type: ActionsActionTypes.setAction,
                key: action,
                value: newValue,
            });

            const result = await setValue({
                configKeys,
                value: regExpValue,
            });

            if (!result)
                dispatch({
                    type: ActionsActionTypes.setAction,
                    key: action,
                    value: oldValue,
                });

            setChanging(false);
        } catch (err) {
            console.error(err);
        }
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
            {open && (
                <Popup
                    content={`Change to RegExp. Must enclose expression in forward slash characters '/' '/' and add desired flags`}
                    trigger={
                        <Icon
                            name="r circle"
                            onClick={() => changeTrigger()}
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
        <TriggerRegExpInput index={index} trigger={trigger} />
    ) : (
        <TriggerStringInput index={index} trigger={trigger} />
    );

const AddTriggerButton = () => {
    const { dispatch, action, actions } = useContext(ActionsContext);
    if (!action) return <></>;

    const triggersKeys = ['actions', action, 'triggers'];

    const addTrigger = async () => {
        const oldValue = actions[action];
        const triggers = [...oldValue.triggers];
        triggers.push('');

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
        <Popup
            content={`Add trigger to ${action}`}
            trigger={<Button icon="add" onClick={() => addTrigger()} />}
        />
    );
};
const Triggers = ({ triggers }: { triggers: TriggerType[] }) => (
    <Segment>
        <Header as="h2">Triggers</Header>
        <AddTriggerButton />
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
