import React, { useContext, useState, useEffect } from 'react';
import { Button, Icon, Input, Modal } from 'semantic-ui-react';
import { ApiContext } from '../../../../../services/ApiContext';
import { getImgurToken } from '../../../../../services/Api/services/APIs';
import { Api, ApiAction } from '../../../../../types/Apis';
import { authFetchJSON } from '../../../../../services/Api/services/AuthFetch';

interface BearerTokenResponse {
    bearerToken: string;
}

type BR = BearerTokenResponse | undefined;

const getTwitterToken = async ({
    dispatch,
    twitter,
}: {
    dispatch: React.Dispatch<ApiAction>;
    twitter: Api;
}) => {
    const route = 'tokens/twitter';
    const bearerToken = ((await authFetchJSON(route)) as BR)?.bearerToken;

    console.log('response is', bearerToken);
};

const GetTokenModal = ({
    close,
    open,
}: {
    close: () => void;
    open: boolean;
}) => {
    const { dispatch, apis, fetching } = useContext(ApiContext);

    const isFetching = fetching.includes('twitter');
    const twitter = apis?.twitter;

    //@ts-ignore
    const consumerKey = twitter?.consumerKey;
    //@ts-ignore
    const consumerSecret = twitter?.consumerSecret;
    //disable the get token button if there isn't a consumerKey and consumerSecret
    const disabled = isFetching || !consumerKey || !consumerSecret;

    useEffect(() => {
        !isFetching && close();
    }, [isFetching]);

    return (
        <Modal
            closeOnEscape
            closeOnDimmerClick
            open={open}
            onClose={() => close()}
        >
            <Modal.Header>Get Imgur Token</Modal.Header>
            <Modal.Content>
                {disabled
                    ? `You need to fill in the ${
                          !consumerKey ? 'consumerKey' : ''
                      } ${!consumerKey && !consumerSecret ? 'and' : ''} ${
                          !consumerSecret ? 'consumerSecret' : ''
                      }.`
                    : 'Click the Get Token button'}
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" onClick={() => close()}>
                    <Icon name="remove" /> Cancel
                </Button>
                <Button
                    color="green"
                    disabled={disabled}
                    loading={isFetching}
                    onClick={() =>
                        getTwitterToken({
                            dispatch,
                            twitter,
                        })
                    }
                >
                    <Icon name="checkmark" /> Get Token
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default GetTokenModal;
