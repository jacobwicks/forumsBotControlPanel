import { apiUrl } from '../../index';
import expectJSON from '../ExpectJSON';
import authFetch from '../AuthFetch';
import {
    Albums,
    AlbumsAction,
    AlbumsActionTypes,
    ReviewImage,
} from '../../../../types';

//gets the imgur albums for the bot from the API
const getAlbums = async () => {
    const route = 'albums';
    const url = `${apiUrl}${route}`;
    const response = await expectJSON(authFetch(url));
    const albums: Albums | undefined = response?.albums;
    const imageQueue: ReviewImage[] | undefined = response?.imageQueue;
    return {
        albums,
        imageQueue,
    };
};

//loads albums into the albumsContext
const loadAlbums = async (dispatch: React.Dispatch<AlbumsAction>) => {
    dispatch({ type: AlbumsActionTypes.fetchAlbumsAttempt });
    const { albums, imageQueue } = await getAlbums();
    if (albums) {
        dispatch({
            type: AlbumsActionTypes.fetchAlbumsSuccess,
            albums,
            imageQueue,
        });
    } else dispatch({ type: AlbumsActionTypes.fetchAlbumsFailure });
};

export default loadAlbums;
