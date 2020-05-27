import authFetch from '../AuthFetch';
import getStringBody from '../GetStringBody';

interface setPropertyProps {
    configKeys: string[];
    value: any;
}

//sets a value in the config file that the Bot uses
const setProperty = async (jsonBody: setPropertyProps) => {
    //the API route that the request will be sent to
    const route = 'setProperty';

    //stringify the body of the POST to api
    const body = getStringBody(jsonBody);

    try {
        //Post method = true,
        const response = await authFetch(route, true, body);

        //return true if status === 200, else false
        //calling fn should deal with dispatching actions to context
        return response?.status === 200;
    } catch (err) {
        return undefined;
    }
};

export default setProperty;
