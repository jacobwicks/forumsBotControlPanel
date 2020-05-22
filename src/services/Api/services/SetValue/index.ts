import { apiUrl } from '../../index';
import authFetch from '../AuthFetch';

interface setValueProps {
    configKeys: string[];
    value: any;
}

//sets a value in the config file that the Bot uses
const setValue = async (jsonBody: setValueProps) => {
    //the API route that the request will be sent to
    const route = 'setValue';

    //the full api endpoint
    const url = `${apiUrl}${route}`;

    //stringify the body of the POST to api
    const body = JSON.stringify(jsonBody);

    //Post method = true,
    const response = await authFetch(url, true, body);

    //return true if status === 200, else false
    //calling fn should deal with dispatching actions to context
    return response?.status === 200;
};

export default setValue;
