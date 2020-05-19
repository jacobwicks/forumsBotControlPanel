import React from 'react';
import { apiKeys } from '../../config.json';

const ApiKeys = () => (
    <div>
        {Object.keys(apiKeys).map((apiKey: string, index) => (
            <div key={index}>{apiKey}</div>
        ))}
    </div>
);

export default ApiKeys;
