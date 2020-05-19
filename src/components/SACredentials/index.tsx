import React from 'react';
import { creds } from '../../config.json';

const SACredentials = () => (
    <div>
        <div>{creds.username}</div>
        <div>{creds.password}</div>
    </div>
);

export default SACredentials;
