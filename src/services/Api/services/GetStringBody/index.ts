const getStringBody = (jsonBody: { [key: string]: any }) =>
    Object.keys(jsonBody).reduce((stringBody: string, key: string) => {
        stringBody = stringBody + `${key}=${JSON.stringify(jsonBody[key])}&`;
        return stringBody;
    }, '');

export default getStringBody;
