import { getToken } from '../Token';

export const getHeaders = () => {
    const token = getToken();
    return token
        ? new Headers({
              Authorization: 'Bearer ' + token,
              'content-type': 'application/x-www-form-urlencoded',
          })
        : undefined;
};
