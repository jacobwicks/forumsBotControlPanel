import React, { useContext } from 'react';
import { Button, Label, Popup } from 'semantic-ui-react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { ImageReviewStatus, AlbumsActionTypes } from '../../../../types';

const SidebarAlbum = ({ album, index }: { album: string; index: number }) => {
    const { dispatch, album: currentAlbum, imageQueue } = useContext(
        AlbumsContext
    );

    //filter the image queue to the pending images for this albumg
    const images = imageQueue?.filter(
        (img) => img.album === album && img.status === ImageReviewStatus.pending
    ).length;

    return (
        <div key={index} style={{ padding: 10 }}>
            <Popup
                content={`Click to review images for ${album}`}
                disabled={!images}
                trigger={
                    <Button
                        color={images ? 'red' : undefined}
                        onClick={() => {
                            dispatch({
                                type: AlbumsActionTypes.setAlbum,
                                album,
                            });
                            images &&
                                dispatch({
                                    type: AlbumsActionTypes.setReview,
                                    review: true,
                                });
                        }}
                    >
                        {images}
                    </Button>
                }
            />
            <Label
                color={album === currentAlbum ? 'green' : undefined}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                    dispatch({
                        type: AlbumsActionTypes.setAlbum,
                        album,
                    })
                }
            >
                {album}
            </Label>
        </div>
    );
};

export default SidebarAlbum;
