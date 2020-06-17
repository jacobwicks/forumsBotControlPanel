import React, { useState } from 'react';
import { Button, Icon, Label, Segment } from 'semantic-ui-react';
import ArrayDisplay from '../ArrayDisplay';
import EditableInput from '../../EditableInput';
//import getChildren from '../GetChildren';

const ObjectDisplay = ({
    object,
    name,
}: {
    object: { [key: string]: any };
    name: string;
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <span style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
                <Button icon="edit" />
                <Label size="large">{name}</Label>
                <Icon name={open ? 'caret down' : 'caret right'} />
            </span>
            {open && (
                <Segment style={{ marginBottom: 10 }}>
                    {Object.keys(object).map((key: string) => {
                        const value = object[key];
                        const display =
                            // prettier-ignore
                            value === 'object' 
                            ? Array.isArray(value) 
                                ? <ArrayDisplay array={value} name={key}/>
                                : <ObjectDisplay
                                    object={value}
                                    name={key}
                                    
                                />
                            :  <EditableInput
                            configKeys={[]}
                            callback={(value: string) =>
                                console.log('callback', value)
                            }
                            input={key}
                            targetsProperty
                            tellParentOpen={(isOpen: boolean) =>
                                console.log(isOpen)
                            }
                            value={value}
                        />;

                        return <div key={key}>{display}</div>;
                    })}
                </Segment>
            )}
        </div>
    );
};

export default ObjectDisplay;
