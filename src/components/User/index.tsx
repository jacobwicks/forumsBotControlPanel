import React from 'react';
import { Header, Image } from 'semantic-ui-react';
import { SAUser } from '../../types/types';

const User = ({ avatar, name, profile, regDate, title }: SAUser) => (
    <div>
        <Header>
            <a href={profile} target="_blank" rel="noopener noreferrer">
                {name}
            </a>
        </Header>
        {regDate}
        <br />
        <br />
        {avatar && <Image src={avatar} />}
        {title}
    </div>
);

export default User;
