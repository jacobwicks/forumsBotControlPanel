import React from 'react';
import { Segment } from 'semantic-ui-react';
import ReactMarkdown from '../../../Markdown';
import useResize from '../../../APIs/components/Instructions/GenericInstructions/services/UseResize';
import { spacing } from '../../../../services/Spacing';

export const Instruction = ({
    input,
    addChildren,
}: {
    input: string;
    addChildren?: JSX.Element[];
}) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const maxWidth = useResize(divRef);

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

    return (
        <div ref={divRef} style={spacing}>
            <Segment children={children} />
        </div>
    );
};

export default Instruction;
