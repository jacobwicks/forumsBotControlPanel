import { authFetchJSON } from '../AuthFetch';
import {
    Albums,
    AlbumsAction,
    AlbumsActionTypes,
    ReviewImage,
} from '../../../../types';
import { Dispatch } from 'react';
import { apiUrl } from '../..';
import { getHeaders } from '../Headers';

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
    const acceptImageUrl = `${apiUrl}${route}`;

    try {
        const body = JSON.stringify({
            submittedAt,
        });

        const headers = getHeaders();

        const options = {
            //it's a post request
            method: 'POST',

            headers,

            body,
        };

        //call fetch at the loginUrl
        const response = await fetch(acceptImageUrl, options);
        console.log(response.status);

        const json = await response?.json();
        const uploadedImageUrl = json?.uploadedImageUrl;

        uploadedImageUrl
            ? //maybe display a message with a link? Or not, who cares
              console.log(`image successfully uploaded to`, uploadedImageUrl)
            : //should probably display a failure alert... Upload failed, added back to queue
              dispatch({ type: AlbumsActionTypes.pending, submittedAt });
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
