export const getHeaders = () => {
    const token = localStorage.getItem('token');
    return token
        ? new Headers({
              Authorization: 'Bearer ' + token,
              'content-type': 'application/x-www-form-urlencoded',
          })
        : undefined;
};
