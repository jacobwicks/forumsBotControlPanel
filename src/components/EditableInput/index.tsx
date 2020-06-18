import React, { useState, useEffect } from 'react';
import {
    Button,
    Checkbox,
    Form,
    Icon,
    Input,
    Label,
    TextArea,
} from 'semantic-ui-react';
import { AlbumsAction, BotAction } from '../../types/types';
import setValue from '../../services/Api/services/SetValue';
import setProperty from '../../services/Api/services/SetProperty';
import dispatchAll from './services/DispatchAll';

//lots of props, but it's a very capable input component
interface EditableInputProps {
    //function called instead of dispatch before
    //lets you use editableInput for something besides dispatching actions
    callback?: (...args: any) => void;

    checkbox?: boolean;

    //the path of the variable that the input edits
    //the API uses this to find the setting that is being edited
    configKeys: string[];

    //dispatch to the appropriate config
    dispatch?: (action: any) => void;
    //dispatch: React.Dispatch<AlbumsAction> | React.Dispatch<BotAction>;

    //dispatch actions before calling setValue
    dispatchBefore?: [AlbumsAction | BotAction];

    //dispatch actions if setValue fails
    dispatchOnFailure?: [AlbumsAction | BotAction];

    //dispatch actions is setValue succeeds
    dispatchOnSuccess?: [AlbumsAction | BotAction];

    //the name of the input
    //this is used as the key in the key: value pair
    //when editing the config file in the API/Bot
    input: string;

    //human readable label text if the input name isn't good
    labelText?: string;

    //password mask the input
    password?: boolean;

    //target is an object property, not a value
    //e.g. the album name is used as a key for the value of the album
    //it is an object property of albums
    targetsProperty?: boolean;

    //show a textarea when open instead of an input
    textArea?: boolean;

    //if the parent compnent wants to know about opening
    tellParentOpen?: (open: boolean) => void;

    //the starting value
    value?: string | boolean;
}

const EditableInput = ({
    configKeys,
    callback,
    checkbox,
    dispatch,
    dispatchBefore,
    dispatchOnFailure,
    dispatchOnSuccess,
    input,
    labelText,
    password,
    targetsProperty,
    tellParentOpen,
    textArea,
    value,
}: EditableInputProps) => {
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(value);

    //if the parent component wants to know if the input is open
    useEffect(() => {
        tellParentOpen && tellParentOpen(open);
    }, [open, tellParentOpen]);

    const handleBlur = async (value: string | boolean | number | undefined) => {
        setOpen(false);

        if (callback) {
            callback(value);
        } else if (dispatch) {
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
            const result = targetsProperty
                ? await setProperty({
                      configKeys: [...configKeys, input],
                      value,
                  })
                : await setValue({
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
        }
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
            onBlur={(e: InputEvent) => {
                const target = e.target as HTMLInputElement;
                handleBlur(target.value);
            }}
            onKeyPress={({ key }: { key: string }) => {
                if (key === 'Enter') handleBlur(temp);
            }}
            onChange={({ target }) => setTemp(target.value)}
            type={password ? 'password' : undefined}
            value={temp}
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
        : textArea || (typeof(value) === 'string' && value.length > 19)
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
                    : password 
                        ? <span style={{fontSize:'x-large'}}>•••••</span> 
                        :value
            }
        </div>
    );
};

export default EditableInput;
