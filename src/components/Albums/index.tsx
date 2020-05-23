import React, { useContext, useEffect, useState } from 'react';
import { AlbumsContext } from '../../services/AlbumsContext';
import loadAlbums from '../../services/Api/services/Albums';
import {
    Grid,
    Button,
    Header,
    Image,
    Label,
    Segment,
    GridColumn,
} from 'semantic-ui-react';
import Album from './components/Album';
import ImageReview from './components/ImageReview';

const Albums = () => {
    const [album, setAlbum] = useState('');
    const [review, setReview] = useState(false);

    const { dispatch, hasFailed, fetching, albums, imageQueue } = useContext(
        AlbumsContext
    );

    useEffect(() => {
        !fetching && !hasFailed && !albums && loadAlbums(dispatch);
    }, [dispatch, fetching, hasFailed, albums]);

    const singular = imageQueue?.length === 1;

    return (
        <div>
            <Segment>
                {imageQueue && (
                    <Button onClick={() => setReview(!review)}>
                        There {singular ? 'is' : 'are'}{' '}
                        {imageQueue.length ? imageQueue.length : 'no'} image
                        {!singular && 's'} waiting for review
                    </Button>
                )}
                <br />
                <br />
                <Grid columns={2} divided>
                    <Grid.Column width={3}>
                        {albums &&
                            Object.keys(albums).map((thisAlbum, index) => {
                                const images = imageQueue?.filter(
                                    (img) => img.album === thisAlbum
                                ).length;
                                return (
                                    <div key={index} style={{ padding: 10 }}>
                                        <Button
                                            color={images ? 'red' : undefined}
                                            onClick={() => {
                                                setAlbum(thisAlbum);
                                                images && setReview(true);
                                            }}
                                        >
                                            {images}
                                        </Button>
                                        <Label
                                            color={
                                                thisAlbum === album
                                                    ? 'green'
                                                    : undefined
                                            }
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setAlbum(thisAlbum)}
                                        >
                                            {thisAlbum}
                                        </Label>
                                    </div>
                                );
                            })}
                    </Grid.Column>
                    <Grid.Column>
                        {album && <Album album={album} />}
                    </Grid.Column>
                </Grid>
            </Segment>
            {review && <ImageReview album={album} />}
        </div>
    );
};

export default Albums;
