import React from 'react';

const albums = {
    a: 'foo',
};

const Albums = () => (
    <div>
        {Object.keys(albums).map((album, index) => (
            <div key={index}>{album}</div>
        ))}
    </div>
);

export default Albums;
