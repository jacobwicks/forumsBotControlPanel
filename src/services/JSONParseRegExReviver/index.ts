export const reviver = (key: string, value: any) => {
    if (value.toString().indexOf('__REGEXP ') === 0) {
        var m = value.split('__REGEXP ')[1].match(/\/(.*)\/(.*)?/);
        return new RegExp(m[1], m[2] || '');
    } else return value;
};
