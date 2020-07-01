import React, { useContext } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { InstructionsContext } from '../../../../services/InstructionsContext';
import getLineHeight from '../../../../services/GetLineHeight';

const Threads = () => {
    const { botName, threads } = useContext(InstructionsContext);
    const lineHeight = getLineHeight();

    const lines = 5;

    const maxHeight = lineHeight ? (lines + 1) * lineHeight : 100;

    const zero = !threads.length;
    const singular = threads.length === 1;
    return (
        <Segment>
            <Header as="h2">
                {botName} is currently {zero ? 'not ' : ''}watching{' '}
                {zero ? 'any ' : threads.length} thread{singular ? '' : 's'}
            </Header>
            <div style={{ maxHeight, overflow: 'auto' }}>
                {threads.map((thread, index) => (
                    <div key={index}>
                        <a
                            href={thread.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {thread.title}
                        </a>
                    </div>
                ))}
            </div>
        </Segment>
    );
};

export default Threads;
