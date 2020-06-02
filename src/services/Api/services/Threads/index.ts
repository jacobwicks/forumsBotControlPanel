import {
    FrontEndThread,
    ThreadsAction,
    ThreadsActionTypes,
} from '../../../../types/types';
import { authFetchJSON } from '../AuthFetch';

interface ThreadsResponse {
    threads: FrontEndThread[];
}

type TR = ThreadsResponse | undefined;

//gets the imgur albums for the bot from the API
const getAlbums = async () => {
    const route = 'threads';
    const response = (await authFetchJSON(route)) as TR;
    const threads = response?.threads;

    return threads;
};

//loads albums into the albumsContext
const loadThreads = async (dispatch: React.Dispatch<ThreadsAction>) => {
    dispatch({ type: ThreadsActionTypes.fetchAttempt });
    const threads = await getAlbums();
    if (threads) {
        dispatch({
            type: ThreadsActionTypes.setThreads,
            threads,
        });
    } else dispatch({ type: ThreadsActionTypes.failed });
};

export { loadThreads };
