import { apiUrl } from '../../index';
import expectJSON from '../ExpectJSON';
import authFetch from '../AuthFetch';
import { Albums, AlbumsAction, AlbumsActionTypes } from '../../../../types';

//gets the imgur albums for the bot
const getAlbums = async () => {
    const route = 'albums';
    const url = `${apiUrl}${route}`;
    const response = await expectJSON(authFetch(url));
    const albums: Albums | undefined = response?.albums;
    return albums;
};

const loadAlbums = async (dispatch: React.Dispatch<AlbumsAction>) => {
    dispatch({ type: AlbumsActionTypes.fetchAlbumsAttempt });
    const albums = await getAlbums();
    if (albums) {
        dispatch({ type: AlbumsActionTypes.fetchAlbumsSuccess, albums });
    } else dispatch({ type: AlbumsActionTypes.fetchAlbumsFailure });
};

export default loadAlbums;
