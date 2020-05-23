import authFetch from '../AuthFetch';
import getStringBody from '../GetStringBody';

interface setValueProps {
    configKeys: string[];
    value: any;
}

//sets a value in the config file that the Bot uses
const setValue = async (jsonBody: setValueProps) => {
    //the API route that the request will be sent to
    const route = 'setValue';

    //stringify the body of the POST to api
    const body = getStringBody(jsonBody);

    //Post method = true,
    const response = await authFetch(route, true, body);

    //return true if status === 200, else false
    //calling fn should deal with dispatching actions to context
    return response?.status === 200;
};

export default setValue;
