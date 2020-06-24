import React from 'react';
import { ApiProvider } from '../../services/ApiContext';
import { AlbumsProvider } from '../../services/AlbumsContext';
import { BotProvider } from '../../services/BotContext';
import { EventsProvider } from '../../services/EventsContext';
import { LoginProvider } from '../../services/LoginContext';
import { ThreadsProvider } from '../../services/ThreadsContext';
import { ActionsProvider } from '../../services/ActionsContext';

const Providers = (props: any) => (
    <ActionsProvider>
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
    </ActionsProvider>
);

export default Providers;
