import { authFetchJSON } from '../AuthFetch';
import {
    BotAction,
    APIs,
    BotActionTypes,
    BotFetchKeys,
} from '../../../../types/types';

interface APIsResponse {
    APIs: string[];
}

type AR = APIsResponse | undefined;

//gets the named APIs that the bot has in its config
const getAPIs = async () => {
    const route = 'apis';
    const APIsArray = ((await authFetchJSON(route)) as AR)?.APIs;

    //convert the APIsArray, which is an array of strings
    //into the APIs type object that gets loaded into BotContext
    //the actual content of each api will be loaded if/ when the user loads that individual api
    const APIs = APIsArray
        ? APIsArray.reduce((acc, cur) => {
              acc[cur] = {};
              return acc;
          }, {} as APIs)
        : undefined;

    return APIs;
};

//loads APIs into the BotContext
const loadAPIs = async (dispatch: React.Dispatch<BotAction>) => {
    dispatch({ type: BotActionTypes.fetchAttempt, key: BotFetchKeys.APIs });
    const APIs = await getAPIs();
    if (APIs) {
        dispatch({
            type: BotActionTypes.fetchSuccess,
            key: BotFetchKeys.APIs,
            content: APIs,
        });
    } else
        dispatch({ type: BotActionTypes.fetchFailure, key: BotFetchKeys.APIs });
};

export default loadAPIs;
