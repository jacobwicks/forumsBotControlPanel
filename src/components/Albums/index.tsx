import React from 'react';
import { albums } from '../../config.json';

const Albums = () => (
    <div>
        {Object.keys(albums).map((album, index) => (
            <div key={index}>{album}</div>
        ))}
    </div>
);

export default Albums;
