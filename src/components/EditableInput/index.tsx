import React, { useState, ReactElement } from 'react';
import { Button, Icon, Input, Label } from 'semantic-ui-react';
import { AlbumsAction, BotAction } from '../../types';
import setValue from '../../services/Api/services/SetValue';

//return true if status === 200, else false
//calling fn should deal with dispatching actions to context

//parent component renders input
//provides array of actions before, onSuccess, and onFailure
//actions include prior value if necessary

//user finishes input action
//input action calls handleblur

//handleBlur dispatches dispatchBefore =>
// dispatch set action to context
//context changes state to value

// handleBlur calls api function
// handleBlur hears from api success
// if ncessary dispatches success action
// context receives sucess
// But context state already reflects new value

// calling function hears from api failure
// dispatches failure action
// context receives failure
// failure action
// is set action to prior value

//add this
// User is notified of failed action
// option to ignore, retry, or refresh data from api

const dispatchAll = ({
    dispatch,
    actions,
}: {
    dispatch: (action: AlbumsAction | BotAction) => void;
    actions: [AlbumsAction | BotAction];
}) => dispatch && actions && actions.forEach((action) => dispatch(action));

interface EditableInputProps {
    //render a child element, like a checkbox, instead of the input
    child?: ReactElement;

    //the path of the variable that the input edits
    //the API uses this to find the setting that is being edited
    configKeys: string[];

    //dispatch to the appropriate config
    dispatch: (action: any) => void;
    //dispatch: (action: AlbumsAction | BotAction) => void;

    //dispatch an action before calling setValue
    dispatchBefore?: [AlbumsAction | BotAction];
    dispatchOnFailure?: [AlbumsAction | BotAction];
    dispatchOnSuccess?: [AlbumsAction | BotAction];

    //the name of the input
    input: string;

    //the starting value
    value?: string;
}

const EditableInput = ({
    child,
    configKeys,
    dispatch,
    dispatchBefore,
    dispatchOnFailure,
    dispatchOnSuccess,
    input,
    value,
}: EditableInputProps) => {
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(value);

    const handleBlur = async (value: string) => {
        setOpen(false);
        const time = new Date();

        //if requested, dispatch the attempt to context
        dispatchBefore &&
            dispatchAll({
                dispatch,
                actions: dispatchBefore.map((action) => ({
                    ...action,
                    value: temp,
                })) as any,
            });

        //call api to attempt changeValue
        const result = await setValue({
            configKeys: [...configKeys, input],
            value: temp,
        });

        result
            ? //if value was set, dispatch success actions if any
              dispatchOnSuccess &&
              dispatchAll({ dispatch, actions: dispatchOnSuccess })
            : //else dispatch failure actions
              dispatchOnFailure &&
              dispatchAll({ dispatch, actions: dispatchOnFailure });
    };

    return (
        <div>
            <Button disabled={!!child} icon onClick={() => setOpen(!open)}>
                <Icon name="edit" />
            </Button>
            <Label size="large" content={`${input}: `} />{' '}
            {child ? (
                child
            ) : open ? (
                <Input
                    onKeyPress={({ key }: { key: string }) => {
                        if (key === 'Enter') {
                            !!temp && handleBlur(temp);
                        }
                    }}
                    value={temp}
                    onChange={({ target }) => setTemp(target.value)}
                    onBlur={(e: InputEvent) => {
                        const target = e.target as HTMLInputElement;
                        handleBlur(target.value);
                    }}
                />
            ) : (
                value
            )}
        </div>
    );
};

export default EditableInput;
