import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import getChildren from '../GetChildren';

const ArrayDisplay = ({ array, newest }: { array: any[]; newest: boolean }) => {
    const [open, setOpen] = useState(false);

    return (
        <span>
            <Icon
                name={open ? 'caret down' : 'caret right'}
                onClick={() => setOpen(!open)}
            />
            {open && (
                <div
                    style={{
                        outline: 'solid',
                        outlineColor: 'lime',
                        margin: 10,
                    }}
                >
                    {array.map((el, key) =>
                        // prettier-ignore
                        typeof el === 'object'
                            ? Array.isArray(el) 
                                ? <ArrayDisplay array={el} newest={newest}/>
                                : getChildren(el, newest)
                            : <div key={key}>{el}</div>
                    )}
                </div>
            )}
        </span>
    );
};

export default ArrayDisplay;
