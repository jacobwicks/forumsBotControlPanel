const debounce = (fn: (...arguments: any) => any) => {
    const time = 400;
    let timeout: NodeJS.Timeout;

    return function (): any {
        //@ts-ignore
        const functionCall = () => fn.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(functionCall, time);
    };
};

const asyncAdd = async (num: number) => {
    console.log('add called with', num);
    return num + 1;
};

const debouncedAdd = debounce(asyncAdd);

const doit = async () => {
    const result = await debouncedAdd(3);
    console.log(result);
};

doit();
