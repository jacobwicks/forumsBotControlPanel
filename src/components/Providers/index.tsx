import React from 'react';
import { ApiProvider } from '../../services/ApiContext';
import { AlbumsProvider } from '../../services/AlbumsContext';
import { BotProvider } from '../../services/BotContext';
import { EventsProvider } from '../../services/EventsContext';
import { LoginProvider } from '../../services/LoginContext';
import { ThreadsProvider } from '../../services/ThreadsContext';

const Providers = (props: any) => (
    <ApiProvider>
        <AlbumsProvider>
            <BotProvider>
                <EventsProvider>
                    <LoginProvider>
                        <ThreadsProvider {...props} />
                    </LoginProvider>
                </EventsProvider>
            </BotProvider>
        </AlbumsProvider>
    </ApiProvider>
);

export default Providers;
