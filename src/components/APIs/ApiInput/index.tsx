import React, { useContext } from 'react';
import { ApiActionTypes } from '../../../types/Apis';
import { ApiContext } from '../../../services/ApiContext';
import EditableInput from '../../EditableInput';
import setValue from '../../../services/Api/services/SetValue';

const ApiInput = ({
    api,
    input,
    keys,
    value,
}: {
    //the name of the api
    api: string;

    //the name of the target property
    input?: string;

    //apis can contain objects
    //if so, these keys locate the property for editing
    keys?: string | string[];

    //the value
    value: string | boolean;
}) => {
    const { dispatch, apis } = useContext(ApiContext);
    let configKeys = ['apiKeys', api];

    if (keys) {
        Array.isArray(keys)
            ? (configKeys = [...configKeys, api].concat(keys))
            : (configKeys = [...configKeys, api, keys]);
    }

    input && (configKeys = [...configKeys, input]);

    const oldValue = apis[api];

    const callback = async (value: string) => {
        if (typeof oldValue === 'string') {
            dispatch({
                type: ApiActionTypes.setApi,
                api,
                value,
            });

            const result = await setValue({
                configKeys,
                value,
            });

            if (!result)
                dispatch({
                    type: ApiActionTypes.setApi,
                    api,
                    value: oldValue,
                });
        } else {
            console.log('api is an object, not setting value', oldValue);
        }
    };

    return (
        <EditableInput
            configKeys={configKeys}
            callback={callback}
            input={input ? input : api}
            labelText={input ? undefined : `${api} Key`}
            value={value}
        />
    );
};

export default ApiInput;
