import authFetch from '../../../AuthFetch';
import { AlbumsAction, AlbumsActionTypes } from '../../../../../../types/types';
import { Dispatch } from 'react';

const rejectImageAPI = async (hash: number) => {
    const route = 'rejectImage';

    try {
        const body = { hash };
        const response = await authFetch(route, true, body);
        return response?.status === 200;
    } catch (err) {
        return undefined;
    }
};

export const rejectImage = async ({
    dispatch,
    hash,
}: {
    dispatch: Dispatch<AlbumsAction>;
    hash: number;
}) => {
    //dispatch action to AlbumsContext
    dispatch({ type: AlbumsActionTypes.reject, hash });

    //return true if status === 200, else false
    (await rejectImageAPI(hash))
        ? //maybe display a message with a link? Or not, who cares
          console.log(`image successfully rejected`)
        : //should probably display a failure alert... reject failed, added back to queue
          dispatch({ type: AlbumsActionTypes.pending, hash });
};

export default rejectImage;
