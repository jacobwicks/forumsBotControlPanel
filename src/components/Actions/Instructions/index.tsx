import React, { useContext, useState } from 'react';
import { Button, Segment, Popup } from 'semantic-ui-react';
import ReactMarkdown from '../../Markdown';
//import useResize from './services/UseResize';
import { ActionsContext } from '../../../services/ActionsContext';
import useResize from '../../APIs/Instructions/GenericInstructions/services/UseResize';

export const Instructions = () => {
    const { action, actions } = useContext(ActionsContext);
    const divRef = React.useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);
    const [open, setOpen] = useState(false);

    const instructions = action && actions[action]?.instructions;

    const children = [
        <ReactMarkdown
            key="markdown"
            escapeHtml={false}
            source={instructions}
            maxWidth={maxWidth}
        />,
    ];

    return (
        <div ref={divRef} style={{ marginBottom: 20 }}>
            <Popup
                trigger={
                    <Button onClick={() => setOpen(!open)}>{action}</Button>
                }
                content="click for instructions"
                disabled={open || !instructions}
            />
            {open && <Segment children={children} />}
        </div>
    );
};

export default Instructions;
