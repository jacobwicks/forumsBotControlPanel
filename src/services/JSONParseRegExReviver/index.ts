export const regExpPrefix = '__REGEXP ';

export const reviver = (key: string, value: any) => {
    if (value.toString().indexOf(regExpPrefix) === 0) {
        var m = value.split(regExpPrefix)[1].match(/\/(.*)\/(.*)?/);
        return new RegExp(m[1], m[2] || '');
    } else return value;
};
