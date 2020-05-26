import React, { useContext, useEffect, useState } from 'react';
import { AlbumsContext } from '../../services/AlbumsContext';
import loadAlbums from '../../services/Api/services/Albums';
import { Grid, Button, Label, Segment } from 'semantic-ui-react';
import Album from './components/Album';
import ImageReview from './components/ImageReview';
import { ImageReviewStatus } from '../../types';

const Albums = () => {
    const [album, setAlbum] = useState('');
    const [review, setReview] = useState(false);

    const { dispatch, hasFailed, fetching, albums, imageQueue } = useContext(
        AlbumsContext
    );

    useEffect(() => {
        !fetching && !hasFailed && !albums && loadAlbums(dispatch);
    }, [dispatch, fetching, hasFailed, albums]);

    const toReview = imageQueue?.filter(
        (img) => img.status === ImageReviewStatus.pending
    ).length;

    const singular = toReview === 1;

    return (
        <div>
            <Segment>
                {imageQueue && (
                    <Button onClick={() => setReview(!review)}>
                        There {singular ? 'is' : 'are'}{' '}
                        {toReview ? toReview : 'no'} image
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
                                    (img) =>
                                        img.album === thisAlbum &&
                                        img.status === ImageReviewStatus.pending
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
