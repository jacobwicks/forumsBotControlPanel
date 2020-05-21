import { getHeaders } from '../Headers';

//fetch with authorization: bearer token from localStorage
const authFetch = (url: string, post?: boolean, body?: string) => {
    //wtf typescript https://stackoverflow.com/questions/47754183/typescript-cannot-add-headers-to-a-fetch-api-using-react-native
    const headers: any = getHeaders();
    if (headers) {
        const options = {
            method: post ? 'POST' : 'GET',
            headers,
        };
        //@ts-ignore
        body && (options.body = body);

        return fetch(url, options);
    }
};

export default authFetch;
