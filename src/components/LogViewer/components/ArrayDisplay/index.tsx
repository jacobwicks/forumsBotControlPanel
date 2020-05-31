import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';

const ArrayDisplay = ({ array }: { array: string[] }) => {
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
                    {array.map((el: string, key) => (
                        <div key={key}>{el}</div>
                    ))}
                </div>
            )}
        </span>
    );
};

export default ArrayDisplay;
