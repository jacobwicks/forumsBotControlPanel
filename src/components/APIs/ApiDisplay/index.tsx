import React, { useContext, useEffect } from 'react';
import { loadApi } from '../../../services/Api/services/APIs';
import EditableInput from '../../EditableInput';
import { ApiContext } from '../../../services/ApiContext';
import ArrayDisplay from '../ArrayDisplay';
import ObjectDisplay from '../ObjectDisplay';
import Instructions from '../Instructions';
import ApiInput from '../ApiInput';

const ApiDisplay = ({ api }: { api: string }) => {
    const { dispatch, apis, failed, fetching } = useContext(ApiContext);

    useEffect(() => {
        !fetching.includes(api) &&
            !failed.includes(api) &&
            !!apis[api] &&
            !Object.keys(apis[api]).length &&
            loadApi({ api, dispatch });
    }, [dispatch, apis, api, failed, fetching]);

    const instructionChild = <Instructions api={api} />;
    const thisApi = apis[api];

    //     <EditableInput
    //     configKeys={[]}
    //     callback={(value: string) => console.log('callback', value)}
    //     input={api}
    //     labelText={`${api} Key`}
    //     targetsProperty
    //     tellParentOpen={(isOpen: boolean) => console.log(isOpen)}
    //     value={thisApi}
    // />

    // api,
    // input,
    // keys,
    // type,
    // value,

    const apiChild =
        typeof thisApi === 'string' ? (
            <ApiInput api={api} value={thisApi} />
        ) : (
            Object.entries(thisApi).map(([key, value], index) => {
                return (
                    <div key={index}>
                        {typeof value === 'object' ? (
                            Array.isArray(value) ? (
                                <ArrayDisplay array={value} name={key} />
                            ) : (
                                <ObjectDisplay object={value} name={key} />
                            )
                        ) : (
                            <EditableInput
                                configKeys={[]}
                                callback={(value: string) =>
                                    console.log('callback', value)
                                }
                                input={key}
                                targetsProperty
                                tellParentOpen={(isOpen: boolean) =>
                                    console.log(isOpen)
                                }
                                value={value}
                            />
                        )}
                    </div>
                );
            })
        );

    return (
        <>
            {instructionChild}
            {apiChild}
        </>
    );
};

export default ApiDisplay;
