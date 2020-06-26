import React from 'react';
import ReactMarkdown from '../../Markdown';
import useResize from '../../APIs/Instructions/GenericInstructions/services/UseResize';
import { Segment, Header } from 'semantic-ui-react';

export const RegexTriggerDisplay = ({ input }: { input?: string }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);

    return (
        <Segment>
            {!!input?.length ? (
                <div ref={divRef}>
                    <ReactMarkdown
                        key="markdown"
                        escapeHtml={false}
                        source={input}
                        maxWidth={maxWidth}
                    />{' '}
                </div>
            ) : (
                <Header as="h4">
                    No example given to match regular expression trigger
                </Header>
            )}
        </Segment>
    );
};

export default RegexTriggerDisplay;
