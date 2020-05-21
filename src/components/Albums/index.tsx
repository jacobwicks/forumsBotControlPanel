import React, { useContext, useEffect } from 'react';
import { AlbumsContext } from '../../services/AlbumsContext';
import loadAlbums from '../../services/Api/services/Albums';

const Albums = () => {
    const { dispatch, hasFailed, fetching, albums } = useContext(AlbumsContext);

    useEffect(() => {
        !fetching && !hasFailed && !albums && loadAlbums(dispatch);
    }, [dispatch, fetching, hasFailed, albums, loadAlbums]);

    return (
        <div>
            {albums &&
                Object.keys(albums).map((album, index) => (
                    <div key={index}>{album}</div>
                ))}
        </div>
    );
};

export default Albums;
