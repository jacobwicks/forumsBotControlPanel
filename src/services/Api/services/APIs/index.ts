import { authFetchJSON } from '../AuthFetch';
import { Apis, ApiAction, ApiActionTypes, Api } from '../../../../types/types';

interface ApiResponse {
    api: Api;
}

type SingleR = ApiResponse | undefined;

const getApi = async (requestedApi: string) => {
    const route = `api/${requestedApi}`;

    const api = ((await authFetchJSON(route)) as SingleR)?.api;

    return api;
};

//loads an Api into the Apicontext
export const loadApi = async ({
    api,
    dispatch,
}: {
    api: string;
    dispatch: React.Dispatch<ApiAction>;
}) => {
    //tell the context that we are fetching this api
    dispatch({ type: ApiActionTypes.fetching, api });

    //get the api contents
    const value = await getApi(api);

    //if we got api
    if (value) {
        //load them into the context
        dispatch({
            type: ApiActionTypes.setApi,
            api,
            value,
        });
        //if not, note that loading failed
    } else dispatch({ type: ApiActionTypes.failed, api });
};

interface APIsResponse {
    APIs: string[];
}

type AR = APIsResponse | undefined;

//gets the named APIs that the bot has in its config
const getAPIs = async () => {
    const route = 'apis';
    const apisArray = ((await authFetchJSON(route)) as AR)?.APIs;

    //convert the APIsArray, which is an array of strings
    //into the APIs type object that gets loaded into BotContext
    //the actual content of each api will be loaded if/ when the user loads that individual api
    const apis = apisArray
        ? apisArray.reduce((acc, cur) => {
              acc[cur] = {};
              return acc;
          }, {} as Apis)
        : undefined;

    return apis;
};

//loads APIs into the Apicontext
const loadAPIs = async (dispatch: React.Dispatch<ApiAction>) => {
    //tell the context that we are fetching all apis
    dispatch({ type: ApiActionTypes.fetching, api: 'apis' });

    //get the apis object
    const apis = await getAPIs();

    //if we got apis
    if (apis) {
        //load them into the context
        dispatch({
            type: ApiActionTypes.setApis,
            apis,
        });
        //if not, note that loading failed
    } else dispatch({ type: ApiActionTypes.failed, api: 'apis' });
};

export default loadAPIs;
