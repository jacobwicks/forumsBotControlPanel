import { authFetchJSON } from '../../../AuthFetch';
import { AlbumsAction, AlbumsActionTypes } from '../../../../../../types/types';
import { Dispatch } from 'react';

interface AcceptImageResponse {
    uploadedImageUrl: string;
}

const acceptImageAPI = async (hash: number) => {
    const route = 'acceptImage';

    try {
        //call fetch at the loginUrl
        const body = {
            hash,
        };

        const response = (await authFetchJSON(route, true, body)) as
            | AcceptImageResponse
            | undefined;

        return response?.uploadedImageUrl;
    } catch (err) {
        return undefined;
    }
};

const acceptImage = async ({
    dispatch,
    hash,
}: {
    dispatch: Dispatch<AlbumsAction>;
    hash: number;
}) => {
    //dispatch action to AlbumsContext
    dispatch({ type: AlbumsActionTypes.accept, hash });

    const uploadedImageUrl = await acceptImageAPI(hash);
    uploadedImageUrl
        ? //maybe display a message with a link? Or not, who cares
          console.log(`image successfully uploaded to`, uploadedImageUrl)
        : //should probably display a failure alert... Upload failed, added back to queue
          dispatch({ type: AlbumsActionTypes.pending, hash });
};

export default acceptImage;
