import React, { useState, ReactElement } from 'react';
import { Button, Icon, Input, Label } from 'semantic-ui-react';

const EditableInput = ({
    child,
    configPath,
    dispatch,
    keyName,
    value,
}: {
    child?: ReactElement;
    configPath: string[];
    dispatch: (args: any) => void;
    keyName: string;
    value?: string;
}) => {
    const [open, setOpen] = useState(false);
    const [temp, setTemp] = useState(value);

    const handleBlur = (value: string) => {
        setOpen(false);
        //call api to attempt changeValue
    };

    return (
        <div>
            <Button disabled={!!child} icon onClick={() => setOpen(!open)}>
                <Icon name="edit" />
            </Button>
            <Label size="large" content={`${keyName}: `} />{' '}
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
