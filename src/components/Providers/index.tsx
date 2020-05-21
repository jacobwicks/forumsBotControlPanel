import React from 'react';
import { AlbumsProvider } from '../../services/AlbumsContext';
import { BotProvider } from '../../services/BotContext';
import { LoginProvider } from '../../services/LoginContext';

const Providers = (props: any) => (
    <AlbumsProvider>
        <BotProvider>
            <LoginProvider {...props} />
        </BotProvider>
    </AlbumsProvider>
);

export default Providers;
