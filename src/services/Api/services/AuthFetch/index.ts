import { getHeaders } from '../Headers';
import { apiUrl } from '../..';

//fetch with authorization: bearer token from localStorage
const authFetch = async (route: string, post?: boolean, body?: string) => {
    const url = `${apiUrl}${route}`;

    //wtf typescript https://stackoverflow.com/questions/47754183/typescript-cannot-add-headers-to-a-fetch-api-using-react-native
    const headers: any = getHeaders();
    if (headers) {
        const options = {
            method: post ? 'POST' : 'GET',
            headers,
        };
        //@ts-ignore
        body && (options.body = body);

        try {
            return fetch(url, options);
        } catch (err) {
            console.log(`authfetch caught error`, err);
            //log(err);
            return undefined;
        }
    }
    //explicit return of undefined
    //if no headers, no auth!
    return undefined;
};

export const authFetchJSON = async (route: string) => {
    //fetches using the bearer token
    const responsePromise = authFetch(route);

    if (!responsePromise) return undefined;

    const response = await responsePromise;

    try {
        //waits for the .json method of the response
        const json: object | undefined = await response?.json();

        //returns the json object or undefined if there was any problem
        return json;
    } catch (err) {
        //if there was an error, return undefined
        return undefined;
    }
};

export default authFetch;
