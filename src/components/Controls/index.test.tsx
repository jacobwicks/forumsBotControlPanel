//test the controls page of the control panel
//React lets us create and display components to the user
//We need to import it so that we can look at the components to test them
import React, { useContext } from 'react';

//testing library gives us methods to test components
//we use render to look at React components
//we use cleanup to clear out memory after tests
import { render, cleanup, fireEvent } from '@testing-library/react';

//extend-expect gives us methods that let us say what we think a component will look like when we test it
import '@testing-library/jest-dom/extend-expect';

import { BotState } from '../../types';
import {
    BotContext,
    BotProvider,
    initialState,
} from '../../services/BotContext';
import Controls from './index';

afterEach(cleanup);

//a child component that can be used to display any properties of the context
//that you want to test for effects, but aren't displayed in Controls
// const DisplaysCurrent = () => {
//     const { interval, running } = useContext(BotContext);
//     return(
//         <div>
//             <div data-testid='current'>{current}</div>
//             <div data-testid='show'>
//                 {show.map(subject => <div key={subject}>{subject}</div>)}
//             </div>
//         </div>
//     )
// };

const renderControls = (testState?: BotState, child?: JSX.Element) =>
    render(
        <BotProvider testState={testState}>
            <Controls />
            {child}
        </BotProvider>
    );

it('runs without crashing', () => {
    render(<Controls />);
    renderControls();
});

describe('start and stop buttons', () => {
    const textNotRunning = 'Not Running';
    const textRunning = 'Running';

    describe('start button', () => {
        const offState = { ...initialState, running: false };
        it('has a start button', () => {
            const { getByText } = renderControls(offState);
            const startButton = getByText(/start/i);

            expect(startButton).toBeInTheDocument();
        });

        it('is not running', () => {
            const { getByText } = renderControls(offState);
            const startButton = getByText(/start/i);

            expect(startButton).toBeInTheDocument();

            const isRunning = getByText(/running/i);
            expect(isRunning.textContent).toEqual(textNotRunning);
        });

        it('clicking the start button makes it run', () => {
            const { getByText } = renderControls(offState);
            const startButton = getByText(/start/i);

            const isRunning = getByText(/running/i);
            expect(isRunning.textContent).toEqual(textNotRunning);

            startButton.click();

            expect(isRunning.textContent).toEqual(textRunning);
        });
    });

    describe('stop button', () => {
        const onState = { ...initialState, running: true };
        it('has a stop button', () => {
            const { getByText } = renderControls(onState);
            const stopButton = getByText(/stop/i);

            expect(stopButton).toBeInTheDocument();
        });

        it('is running', () => {
            const { getByText } = renderControls(onState);
            const stopButton = getByText(/stop/i);

            expect(stopButton).toBeInTheDocument();

            const isRunning = getByText(/running/i);
            expect(isRunning).toHaveTextContent(textRunning);
        });

        it('clicking the stop button makes it stop running', () => {
            const { getByText } = renderControls(onState);
            const stopButton = getByText(/stop/i);

            const isRunning = getByText(/running/i);
            expect(isRunning.textContent).toEqual(textRunning);

            stopButton.click();

            expect(isRunning.textContent).toEqual(textNotRunning);
        });
    });
});

it('tells the user if the bot is currently running', () => {
    const { getByText } = render(<Controls />);
    const botStateHeader = getByText('bot state', { exact: false });

    expect(botStateHeader).toBeInTheDocument();
});
