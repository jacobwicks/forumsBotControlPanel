import React from 'react';
import { Label, Popup } from 'semantic-ui-react';
import { Trigger } from '../../../types/types';

const SideBarAction = ({
    labelColor,
    name,
    selectAction,
}: {
    labelColor?: 'green' | 'blue';
    name?: string;
    selectAction: () => void;
}) => (
    <div
        style={{
            cursor: 'pointer',
            padding: 10,
        }}
        onClick={selectAction}
    >
        {<Label color={labelColor}>{name}</Label>}
    </div>
);

export default SideBarAction;
