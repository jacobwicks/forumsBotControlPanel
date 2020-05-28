import { AlbumsAction } from '../../../../../types';

const addExistingAlbum = ({
    album,
    dispatch,
    description,
    hash,
}: {
    album?: string;
    dispatch: React.Dispatch<AlbumsAction>;
    description?: string;
    hash?: string;
}) => {
    //get album info from imgur
    //add album to context
    // dispatch({
    //     type: AlbumsActionTypes.addExistingAlbum,
    //     album,
    //     description,
    //     hash,
    //     status,
    // });
    //const result = add album to API
    //if !result deleteAlbum
};

export default addExistingAlbum;
