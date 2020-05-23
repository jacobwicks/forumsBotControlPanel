import React, { useState, ReactElement } from 'react';
import { Button, Form, Icon, Input, Label, TextArea } from 'semantic-ui-react';
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

    //show a textarea when open instead of an input
    textArea?: boolean;

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
    textArea,
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
                textArea ? (
                    <Form>
                        <TextArea
                            onKeyPress={({ key }: { key: string }) => {
                                if (key === 'Enter') {
                                    !!temp && handleBlur(temp);
                                }
                            }}
                            value={temp}
                            onChange={(e, { value }) =>
                                setTemp(value ? value.toString() : '')
                            }
                            onBlur={(e: InputEvent) => {
                                const target = e.target as HTMLInputElement;
                                handleBlur(target.value);
                            }}
                        />
                    </Form>
                ) : (
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
                )
            ) : (
                value
            )}
        </div>
    );
};

export default EditableInput;
