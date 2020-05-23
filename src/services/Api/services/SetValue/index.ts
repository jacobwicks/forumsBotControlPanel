import { apiUrl } from '../../index';
import authFetch from '../AuthFetch';

interface setValueProps {
    configKeys: string[];
    value: any;
}

const getStringBody = (jsonBody: { [key: string]: any }) =>
    Object.keys(jsonBody).reduce((stringBody: string, key: string) => {
        stringBody = stringBody + `${key}=${JSON.stringify(jsonBody[key])}&`;
        return stringBody;
    }, '');

//sets a value in the config file that the Bot uses
const setValue = async (jsonBody: setValueProps) => {
    //the API route that the request will be sent to
    const route = 'setValue';

    //the full api endpoint
    const url = `${apiUrl}${route}`;

    //stringify the body of the POST to api
    const body = getStringBody(jsonBody);

    //Post method = true,
    const response = await authFetch(url, true, body);

    //return true if status === 200, else false
    //calling fn should deal with dispatching actions to context
    return response?.status === 200;
};

export default setValue;

// const setValue = async ({
//     configKeys,
//     value,
// }: {
//     configKeys: string[];
//     value: any;
// }) => {
//     //the API route that the request will be sent to
//     const route = 'setValue';

//     //the full api endpoint
//     const url = `${apiUrl}${route}`;

//     const jsonBody = {
//         configKeys,
//         value,
//     };

//     //stringify the body of the POST to api
//     const body =
//         jsonBody &&
//         Object.keys(jsonBody).reduce((parsedBody: string, current: string) => {
//             parsedBody =
//                 //@ts-ignore
//                 parsedBody + `${current}=${JSON.stringify(jsonBody[current])}&`;
//             return parsedBody;
//         }, '');

//     console.log(`the body as a string is`, body);

//     const headers: any = getHeaders();
//     if (headers) {
//         const options = {
//             method: 'POST',
//             headers,
//             body,
//         };

//         console.log(`fetch options`, options);
//         const response = await fetch(url, options);

//         return response?.status === 200;
//     }

//     return false;
// };
