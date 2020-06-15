import React, { useContext, useEffect } from 'react';
import loadAPIs, { loadApi } from '../../services/Api/services/APIs';
import { ApiActionTypes } from '../../types/types';
import { Header, Label, Grid } from 'semantic-ui-react';
import { ApiContext } from '../../services/ApiContext';
import ArrayDisplay from './ArrayDisplay';
import ObjectDisplay from './ObjectDisplay';
import EditableInput from '../EditableInput';

const ApiDisplay = ({ api }: { api: string }) => {
    const { dispatch, apis, failed, fetching } = useContext(ApiContext);
    useEffect(() => {
        !fetching.includes(api) &&
            !failed.includes(api) &&
            !!apis[api] &&
            !Object.keys(apis[api]).length &&
            loadApi({ api, dispatch });
    }, [dispatch, apis, api, failed, fetching]);

    const thisApi = apis[api];
    if (typeof thisApi === 'string') {
        return (
            <EditableInput
                configKeys={[]}
                callback={(value: string) => console.log('callback', value)}
                input={api}
                labelText="API"
                targetsProperty
                tellParentOpen={(isOpen: boolean) => console.log(isOpen)}
                value={thisApi}
            />
        );
    } else
        return (
            <>
                {Object.entries(thisApi).map(([key, value], index) => {
                    return (
                        <div key={index}>
                            {typeof value === 'object' ? (
                                Array.isArray(value) ? (
                                    <>
                                        <Label>{key}</Label>
                                        <ArrayDisplay
                                            array={value}
                                            newest={false}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Label>{key}</Label>
                                        <ObjectDisplay
                                            object={value}
                                            newest={false}
                                        />
                                    </>
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
                })}
            </>
        );
};

const APIs = () => {
    const { dispatch, apis, current, failed, fetching } = useContext(
        ApiContext
    );

    useEffect(() => {
        !fetching.includes('apis') &&
            !failed.includes('apis') &&
            !Object.keys(apis).length &&
            loadAPIs(dispatch);
    }, [dispatch, apis, fetching, failed]);

    return (
        <Grid divided>
            <Grid.Column width={4}>
                <Header as="h2">APIs </Header>
                <div>
                    {apis &&
                        Object.keys(apis).map((api, index) => (
                            <>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    key={index}
                                    onClick={() =>
                                        dispatch({
                                            type: ApiActionTypes.setCurrent,
                                            current: api,
                                        })
                                    }
                                >
                                    <Label>{api}</Label>
                                </div>
                                <br />
                            </>
                        ))}
                </div>
            </Grid.Column>
            <Grid.Column width={8}>
                {current}
                {current && apis?.[current] && <ApiDisplay api={current} />}
            </Grid.Column>
        </Grid>
    );
};

export default APIs;
