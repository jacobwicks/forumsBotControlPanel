import React from 'react';
import { AlbumsProvider } from '../../services/AlbumsContext';
import { BotProvider } from '../../services/BotContext';
import { EventsProvider } from '../../services/EventsContext';
import { LoginProvider } from '../../services/LoginContext';

const Providers = (props: any) => (
    <AlbumsProvider>
        <BotProvider>
            <EventsProvider>
                <LoginProvider {...props} />
            </EventsProvider>
        </BotProvider>
    </AlbumsProvider>
);

export default Providers;
