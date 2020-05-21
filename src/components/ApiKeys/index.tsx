import React from 'react';

const apiKeys = {};
const ApiKeys = () => (
    <div>
        {Object.keys(apiKeys).map((apiKey: string, index) => (
            <div key={index}>{apiKey}</div>
        ))}
    </div>
);

export default ApiKeys;
