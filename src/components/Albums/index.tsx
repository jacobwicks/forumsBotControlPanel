import React, { useContext, useEffect } from 'react';
import { AlbumsContext } from '../../services/AlbumsContext';
import loadAlbums from '../../services/Api/services/Albums';
import { Grid, Button, Segment } from 'semantic-ui-react';
import Album from './components/Album';
import ImageReview from './components/ImageReview';
import { ImageReviewStatus, AlbumsActionTypes } from '../../types';
import SidebarAlbum from './components/SidebarAlbum';

const Albums = () => {
    const {
        dispatch,
        album,
        albums,
        hasFailed,
        fetching,
        imageQueue,
        review,
    } = useContext(AlbumsContext);

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
                    <Button
                        onClick={() =>
                            album
                                ? dispatch({
                                      type: AlbumsActionTypes.setAlbum,
                                      album: '',
                                  })
                                : dispatch({
                                      type: AlbumsActionTypes.setReview,
                                      review: !review,
                                  })
                        }
                    >
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
                            Object.keys(albums)
                                .sort()
                                .map((thisAlbum, index) => (
                                    <SidebarAlbum
                                        album={thisAlbum}
                                        index={index}
                                    />
                                ))}
                    </Grid.Column>
                    <Grid.Column>
                        {album && <Album album={album} key={album} />}
                    </Grid.Column>
                </Grid>
            </Segment>
            {review && <ImageReview album={album} />}
        </div>
    );
};

export default Albums;
