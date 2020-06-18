import React, { useState } from 'react';
import { Button, Label, Icon, Segment } from 'semantic-ui-react';
import ObjectDisplay from '../ObjectDisplay';
import ApiInput from '../ApiInput';

const ArrayDisplay = ({
    api,
    keys,
    array,
    name,
}: {
    api: string;
    keys: string[];
    array: any[];
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
                    {array.map((el, key) =>
                        // prettier-ignore
                        React.isValidElement(el)
                        ? el
                         : typeof el === 'object'
                            ? Array.isArray(el) 
                                ? <ArrayDisplay api={api} array={el} keys={keys} name={key.toString()}/>
                                : <ObjectDisplay api={api} keys={keys} object={el} name={key.toString()}/>
                            : <ApiInput api={api} keys={keys} value={el}/>
                    )}
                </Segment>
            )}
        </div>
    );
};

export default ArrayDisplay;
