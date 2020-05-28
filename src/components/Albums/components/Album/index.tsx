import React, { useContext } from 'react';
import { AlbumsContext } from '../../../../services/AlbumsContext';
import { Header, Loader } from 'semantic-ui-react';
import { AlbumsActionTypes } from '../../../../types';
import AlbumInput from '../AlbumInput';
import EditableInput from '../../../EditableInput';
import authFetch from '../../../../services/Api/services/AuthFetch';

const Album = ({ album }: { album: string }) => {
    const { dispatch, albums } = useContext(AlbumsContext);

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

    const setAlbumName = async (value: string) => {
        dispatch({ type: AlbumsActionTypes.setName, album, value });
        const result = authFetch(
            'renameAlbum',
            true,
            JSON.stringify({ album, value })
        );

        !result &&
            dispatch({
                type: AlbumsActionTypes.setName,
                album: value,
                value: album,
            });
    };

    return (
        <div>
            <Header>
                <EditableInput
                    configKeys={['albums']}
                    callback={setAlbumName}
                    input={album}
                    labelText="Album"
                    targetsProperty
                    value={album}
                />
            </Header>
            <a href={`https://imgur.com/a/${thisAlbum.hash}`} target="_blank">
                View album {album} on Imgur
            </a>
            <br />
            <br />
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
