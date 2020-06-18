import React, { ReactElement, useEffect, useState } from 'react';
import { authFetchJSON } from '../../../../services/Api/services/AuthFetch';
import ReactMarkdown from 'react-markdown/with-html';
import { Button, Segment, Popup } from 'semantic-ui-react';

export const GenericInstructions = ({
    api,
    addChildren,
}: {
    api: string;
    addChildren?: JSX.Element[];
}) => {
    const [open, setOpen] = useState(false);

    const [input, setInput] = useState('');
    const [done, setDone] = useState(false);

    const getInput = async () => {
        if (!done) {
            const route = 'markdown';
            const body = { keys: ['apis', api] };

            interface MarkdownResponse {
                markdown: string;
            }
            type MR = MarkdownResponse | undefined;

            const markdown = ((await authFetchJSON(route, true, body)) as MR)
                ?.markdown;

            markdown && setInput(markdown);

            setDone(true);
        }
    };

    useEffect(() => {
        getInput();
    }, [done, setDone, getInput, setInput]);

    const children = [
        <ReactMarkdown key="markdown" escapeHtml={false} source={input} />,
    ];

    addChildren?.forEach((child, index) =>
        children.push({ ...child, key: index.toString() })
    );

    return (
        <div style={{ marginBottom: 20 }}>
            <Popup
                trigger={<Button onClick={() => setOpen(!open)}>{api}</Button>}
                content="click for instructions"
                disabled={open}
            />
            {open && <Segment children={children} />}
        </div>
    );
};

export default GenericInstructions;
