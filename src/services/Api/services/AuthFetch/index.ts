import { getHeaders } from '../Headers';
import { apiUrl } from '../..';

//fetch with authorization: bearer token from localStorage
const authFetch = (route: string, post?: boolean, body?: string) => {
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

        console.log(`fetch options`, options);
        return fetch(url, options);
    }
};

export default authFetch;
