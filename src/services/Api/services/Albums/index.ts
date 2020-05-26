import { authFetchJSON } from '../AuthFetch';
import {
    Albums,
    AlbumsAction,
    AlbumsActionTypes,
    ReviewImage,
} from '../../../../types';
import { Dispatch } from 'react';

interface AlbumsResponse {
    albums: Albums;
    imageQueue: ReviewImage[];
}

type AR = AlbumsResponse | undefined;

export const acceptImage = ({
    dispatch,
    submittedAt,
}: {
    dispatch: Dispatch<AlbumsAction>;
    submittedAt: string;
}) => {
    //dispatch action to AlbumsContext
    dispatch({ type: AlbumsActionTypes.accept, submittedAt });
    //request API to accept image
    //API Route calls uploadImageToAlbum function
    //uploadImageToAlbum function returns true/undefined
    //api route returns 200/500
    //if true/200 do nothing
    //if false/500, put the image back in the queue
    //and display a toast
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
