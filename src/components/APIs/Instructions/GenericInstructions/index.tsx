import React, { useEffect, useState, useCallback } from 'react';
import { authFetchJSON } from '../../../../services/Api/services/AuthFetch';
//import ReactMarkdown from 'react-markdown/with-html';
import { Button, Segment, Popup } from 'semantic-ui-react';
import ReactMarkdown from '../../../Markdown';

const useResize = (myRef: any) => {
    const getWidth = useCallback(() => myRef?.current?.offsetWidth, [myRef]);

    const [width, setWidth] = useState<number | undefined>(undefined);

    useEffect(() => {
        const handleResize = () => {
            setWidth(getWidth());
        };

        if (myRef.current) {
            setWidth(getWidth());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [getWidth, myRef]);

    return width && width > 25 ? width - 25 : width;
};

export const GenericInstructions = ({
    api,
    addChildren,
}: {
    api: string;
    addChildren?: JSX.Element[];
}) => {
    // const divRef = React.useRef<HTMLDivElement>(null);
    const divRef = React.useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);
    const [open, setOpen] = useState(false);

    const [input, setInput] = useState('');
    const [done, setDone] = useState(false);

    const getInput = useCallback(async () => {
        if (!done) {
            const route = `markdown/apis/${api}`;
            //const body = { keys: ['apis', api] };

            interface MarkdownResponse {
                markdown: string;
            }
            type MR = MarkdownResponse | undefined;

            const markdown = ((await authFetchJSON(route)) as MR)?.markdown;

            markdown && setInput(markdown);

            setDone(true);
        }
    }, [api, done, setDone, setInput]);

    useEffect(() => {
        getInput();
    }, [done, setDone, getInput, setInput]);

    const children = [
        <ReactMarkdown
            key="markdown"
            escapeHtml={false}
            source={input}
            maxWidth={maxWidth}
        />,
    ];

    addChildren?.forEach((child, index) =>
        children.push({ ...child, key: index.toString() })
    );

    const noInstructions = done && !input;

    return (
        <div ref={divRef} style={{ marginBottom: 20 }}>
            <Popup
                trigger={
                    <Button onClick={() => input && setOpen(!open)}>
                        {api}
                    </Button>
                }
                content="click for instructions"
                disabled={open || noInstructions}
            />
            {open && <Segment children={children} />}
        </div>
    );
};

export default GenericInstructions;
