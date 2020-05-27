import authFetch, { authFetchJSON } from '../AuthFetch';
import {
    Albums,
    AlbumsAction,
    AlbumsActionTypes,
    ReviewImage,
} from '../../../../types';
import { Dispatch } from 'react';
import getStringBody from '../GetStringBody';

interface AlbumsResponse {
    albums: Albums;
    imageQueue: ReviewImage[];
}

type AR = AlbumsResponse | undefined;

export const acceptImage = async ({
    dispatch,
    submittedAt,
}: {
    dispatch: Dispatch<AlbumsAction>;
    submittedAt: string;
}) => {
    //dispatch action to AlbumsContext
    dispatch({ type: AlbumsActionTypes.accept, submittedAt });

    const route = 'acceptImage';
    //stringify the body of the POST to api
    const body = getStringBody({ submittedAt });

    try {
        //Post method = true,
        const response = await authFetch(route, true, body);
        console.log(`resposne is`, response);
        // const json = await response?.json();
        // const imageUrl = json?.imageUrl;
        // console.log(`imageUrl`, imageUrl);
        // //return true if status === 200, else false
        // //calling fn should deal with dispatching actions to context
        // imageUrl
        //     ? dispatch({ type: AlbumsActionTypes.delete, submittedAt })
        //     : dispatch({ type: AlbumsActionTypes.pending, submittedAt });
    } catch (err) {
        return undefined;
    }
};

export const rejectImage = ({
    dispatch,
    submittedAt,
}: {
    dispatch: Dispatch<AlbumsAction>;
    submittedAt: string;
}) => {
    //dispatch action to AlbumsContext
    dispatch({ type: AlbumsActionTypes.reject, submittedAt });
};

//gets the imgur albums for the bot from the API
const getAlbums = async () => {
    const route = 'albums';
    const response = (await authFetchJSON(route)) as AR;
    const albums = response?.albums;
    const imageQueue = response?.imageQueue;

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
