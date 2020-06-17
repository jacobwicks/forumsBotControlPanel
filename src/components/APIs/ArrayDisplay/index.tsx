import React, { useState } from 'react';
import { Button, Label, Icon, Segment } from 'semantic-ui-react';
import ObjectDisplay from '../ObjectDisplay';

const ArrayDisplay = ({ array, name }: { array: any[]; name: string }) => {
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
                    {array.map((el, key) =>
                        // prettier-ignore
                        React.isValidElement(el)
                        ? el
                         : typeof el === 'object'
                            ? Array.isArray(el) 
                                ? <ArrayDisplay array={el} name={key.toString()}/>
                                : <ObjectDisplay object={el} name={key.toString()}/>
                            : <div key={key}>{el}</div>
                    )}
                </Segment>
            )}
        </div>
    );
};

export default ArrayDisplay;
