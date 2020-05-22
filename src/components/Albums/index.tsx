import React, { useContext, useEffect, useState } from 'react';
import { AlbumsContext } from '../../services/AlbumsContext';
import loadAlbums from '../../services/Api/services/Albums';
import { Grid, Label } from 'semantic-ui-react';
import Album from './components/Album';

const Albums = () => {
    const { dispatch, hasFailed, fetching, albums, imageQueue } = useContext(
        AlbumsContext
    );

    const [album, setAlbum] = useState('');

    useEffect(() => {
        !fetching && !hasFailed && !albums && loadAlbums(dispatch);
    }, [dispatch, fetching, hasFailed, albums, loadAlbums]);

    const singular = imageQueue?.length === 1;
    return (
        <div>
            {imageQueue && (
                <div>
                    There {singular ? 'is' : 'are'}{' '}
                    {imageQueue.length ? imageQueue.length : 'no'} image
                    {!singular && 's'} waiting for review
                </div>
            )}
            <br />
            <Grid columns={2} divided>
                <Grid.Column width={2}>
                    {albums &&
                        Object.keys(albums).map((album, index) => (
                            <div key={index} style={{ padding: 10 }}>
                                <Label
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setAlbum(album)}
                                >
                                    {album}
                                </Label>
                            </div>
                        ))}
                </Grid.Column>
                <Grid.Column>{album && <Album album={album} />}</Grid.Column>
            </Grid>
        </div>
    );
};

export default Albums;
