import React, { useContext } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { Header, Loader } from 'semantic-ui-react';
import { AlbumsActionTypes } from '../../../../types';
import AlbumInput from '../AlbumInput';

const Album = ({ album }: { album: string }) => {
    const { albums, imageQueue } = useContext(AlbumsContext);
    //albums isn't necessarily loaded
    if (!albums)
        return (
            <div>
                <Header>{album}</Header>
                <Loader active />
            </div>
        );

    //the full album object from albums
    const thisAlbum = albums[album];

    //an array of ReviewImage
    const reviewImages =
        imageQueue?.filter((image) => image.album === album) || [];

    return (
        <div>
            <Header>{album}</Header>
            <AlbumInput
                album={album}
                input="description"
                textArea
                type={AlbumsActionTypes.setDescription}
                value={thisAlbum.description}
            />
            <br />
            <br />
            <AlbumInput
                album={album}
                input="hash"
                type={AlbumsActionTypes.setHash}
                value={thisAlbum.hash}
            />
            <br />
            <br />
            <AlbumInput
                album={album}
                input="status"
                type={AlbumsActionTypes.setStatus}
                checkbox
                value={thisAlbum.status}
            />
            There are {reviewImages.length ? reviewImages.length : 'no'} images
            to review for this album.
        </div>
    );
};

export default Album;
