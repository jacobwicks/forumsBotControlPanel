import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Icon,
    Input,
    Label,
    TextArea,
} from 'semantic-ui-react';
import { AlbumsAction, BotAction } from '../../types';
import setValue from '../../services/Api/services/SetValue';

//add this
// User is notified of failed action
// option to ignore, retry, or refresh data from api

const dispatchAll = ({
    dispatch,
    actions,
}: {
    dispatch: (action: AlbumsAction | BotAction) => void;
    actions?: [AlbumsAction | BotAction];
}) => dispatch && actions && actions.forEach((action) => dispatch(action));

interface EditableInputProps {
    checkbox?: boolean;

    //the path of the variable that the input edits
    //the API uses this to find the setting that is being edited
    configKeys: string[];

    //dispatch to the appropriate config
    dispatch: (action: any) => void;
    //dispatch: React.Dispatch<AlbumsAction> | React.Dispatch<BotAction>;

    //dispatch an action before calling setValue
    dispatchBefore?: [AlbumsAction | BotAction];
    dispatchOnFailure?: [AlbumsAction | BotAction];
    dispatchOnSuccess?: [AlbumsAction | BotAction];

    //the name of the input
    //this is used as the key in the key: value pair
    //when editing the config file in the API/Bot
    input: string;

    //human readable label text if the input name isn't good
    labelText?: string;

    //show a textarea when open instead of an input
    textArea?: boolean;

    //the starting value
    value?: string | boolean;
}

const EditableInput = ({
    configKeys,
    checkbox,
    dispatch,
    dispatchBefore,
    dispatchOnFailure,
    dispatchOnSuccess,
    input,
    labelText,
    textArea,
    value,
}: EditableInputProps) => {
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(value);

    const handleBlur = async (value: string | boolean | number | undefined) => {
        setOpen(false);
        console.log(`handling blur`, value);

        //if requested, dispatch the attempt to context
        dispatchAll({
            dispatch,
            actions: dispatchBefore?.map((action) => ({
                ...action,
                //add the current value to the action
                value,
            })) as any,
        });

        //call api to attempt changeValue
        const result = await setValue({
            configKeys: [...configKeys, input],
            value,
        });

        result
            ? //if value was set, dispatch success actions
              dispatchAll({ dispatch, actions: dispatchOnSuccess })
            : //else dispatch failure actions
              //normally, to reset value to prior value
              //because change failed
              dispatchAll({ dispatch, actions: dispatchOnFailure });
    };

    const checkboxChild = (
        <Checkbox
            data-testid="status"
            checked={!!value}
            onChange={(e, { checked }) => handleBlur(checked)}
        />
    );

    const inputChild = (
        <Input
            onKeyPress={({ key }: { key: string }) => {
                if (key === 'Enter') handleBlur(temp);
            }}
            value={temp}
            onChange={({ target }) => setTemp(target.value)}
            onBlur={(e: InputEvent) => {
                const target = e.target as HTMLInputElement;
                handleBlur(target.value);
            }}
        />
    );

    const textareaChild = (
        <Form>
            <TextArea
                onKeyPress={({ key }: { key: string }) => {
                    if (key === 'Enter') handleBlur(temp);
                }}
                value={temp as string | undefined}
                onChange={(e, { value }) =>
                    setTemp(value ? value.toString() : '')
                }
                onBlur={(e: InputEvent) => {
                    const target = e.target as HTMLInputElement;
                    handleBlur(target.value);
                }}
            />
        </Form>
    );

    // prettier-ignore
    const child = checkbox
        ? checkboxChild
        : textArea
            ? textareaChild
            : inputChild;

    return (
        <div>
            <Button disabled={checkbox} icon onClick={() => setOpen(!open)}>
                <Icon name="edit" />
            </Button>
            <Label size="large" content={`${labelText ? labelText : input}`} />{' '}
            {
                // prettier-ignore
                checkbox 
                ? child 
                : open 
                    ? child 
                    : value
            }
        </div>
    );
};

export default EditableInput;
