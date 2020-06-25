import React, { useContext } from 'react';
import { spacing } from '../../../services/Spacing';
import { Label, Segment, Header } from 'semantic-ui-react';
import { Trigger as TriggerType } from '../../../types/types';
import { BotContext } from '../../../services/BotContext';

const Trigger = ({ trigger }: { trigger: TriggerType }) => {
    const { settings } = useContext(BotContext);
    const botName = settings?.botName;

    return trigger instanceof RegExp ? (
        <Segment>Regex placeholder</Segment>
    ) : (
        <Segment>
            {botName} {trigger}
        </Segment>
    );
};

const TriggerInstruction = ({ triggers }: { triggers: TriggerType[] }) => (
    <Segment>
        <Header as="h2">How to trigger this action</Header>
        <div style={spacing}>
            {triggers.map((trigger, index) => (
                <Trigger key={index} trigger={trigger} />
            ))}
        </div>
    </Segment>
);

export default TriggerInstruction;
