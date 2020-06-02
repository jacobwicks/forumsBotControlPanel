import React, { useContext } from 'react';
import { ThreadsActionTypes } from '../../../types';
import { ThreadsContext } from '../../../services/ThreadsContext';
import EditableInput from '../../EditableInput';

const ThreadInput = ({
    thread,
    checkbox,
    input,
    textArea,
    type,
    value,
}: {
    thread: number;

    //render a checkbox
    checkbox?: boolean;

    //the type of action to set the input value
    type: ThreadsActionTypes;

    //the input
    input: string;

    //render a textarea
    textArea?: boolean;

    //the old value of the input
    value?: string | boolean;
}) => {
    const { dispatch } = useContext(ThreadsContext);

    const configKeys = ['threads', thread.toString()];

    return (
        <EditableInput
            checkbox={checkbox}
            configKeys={configKeys}
            dispatch={dispatch}
            dispatchBefore={[{ type, thread } as any]}
            dispatchOnFailure={[
                {
                    type,
                    thread,
                    value,
                } as any,
            ]}
            input={input}
            textArea={textArea}
            value={value}
        />
    );
};

export default ThreadInput;
