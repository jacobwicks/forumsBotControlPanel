import React, { useContext } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { Header, Loader } from 'semantic-ui-react';
import { AlbumsActionTypes } from '../../../../types';
import AlbumInput from '../AlbumInput';

const Album = ({ album }: { album: string }) => {
    const { albums } = useContext(AlbumsContext);
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
        </div>
    );
};

export default Album;
