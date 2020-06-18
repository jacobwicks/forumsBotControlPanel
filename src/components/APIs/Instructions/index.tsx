import React, { ReactElement, useState } from 'react';
import ImgurInstructions from './ImgurInstructions';
import TwitterInstructions from './TwitterInstructions';
import { Button, Header, Popup, Segment } from 'semantic-ui-react';
import GenericInstructions2 from './GenericInstructions';

interface Link {
    link: {
        text?: string;
        href: string;
    };
}

export type InstructionsType = { header: string } | string | Link;

export const processInstructions = (instructions: InstructionsType[]) =>
    instructions.reduce((acc, instruction, key) => {
        if (typeof instruction === 'string') {
            acc.push(
                <div style={{ margin: 5 }} key={key}>
                    {instruction}
                    <br />
                </div>
            );
            return acc;
        } else if (instruction.hasOwnProperty('header')) {
            const { header } = instruction as { header: string };
            acc.push(
                <Header as="h2" key={key}>
                    {header}
                </Header>
            );
            return acc;
        } else if (instruction.hasOwnProperty('link')) {
            const { link } = instruction as Link;
            const { text, href } = link;
            acc.push(
                <div style={{ marginLeft: 25 }} key={key}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                        {text ? text : href}
                    </a>
                </div>
            );
            return acc;
        } else return acc;
    }, [] as ReactElement[]);

interface ExtraChild {
    el: ReactElement;
    index?: number;
}

export const GenericInstructions = ({
    api,
    extraChildren,
    instructions,
}: {
    api: string;
    extraChildren?: ExtraChild[];
    instructions: InstructionsType[];
}) => {
    const [open, setOpen] = useState(false);

    const children = processInstructions(instructions);

    extraChildren?.forEach((ec) => {
        const { el, index } = ec;
        index ? children.splice(index, 0, el) : children.push(el);
    });

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

const Instructions = ({ api }: { api: string }) => {
    const instructions = {
        imgur: <ImgurInstructions api={api} />,
        twitter: <TwitterInstructions api={api} />,
        default: <GenericInstructions2 api={api} />,
    } as { [key: string]: ReactElement };

    return instructions[api.toLowerCase()]
        ? instructions[api.toLowerCase()]
        : instructions.default;
};

export default Instructions;
