import React, { useState, useEffect, useContext } from 'react';
import { authFetchJSON } from '../../services/Api/services/AuthFetch';
import SideBarActions from './SideBarActions';
import {
    Loader,
    Message,
    Segment,
    Grid,
    Button,
    Header,
} from 'semantic-ui-react';
import { ActionsContext } from '../../services/ActionsContext';
import { ActionsActionTypes } from '../../types/types';

interface ActionResponse {
    actions: any;
}

type AR = ActionResponse | undefined;

const Actions = () => {
    const { dispatch, actions, action, fetching, failed } = useContext(
        ActionsContext
    );

    const getActions = async () => {
        const route = 'actions';
        const actions = ((await authFetchJSON(route)) as AR)?.actions;
        actions && Object.keys(actions).length
            ? dispatch({ type: ActionsActionTypes.setActions, actions })
            : dispatch({ type: ActionsActionTypes.failed });
    };

    useEffect(() => {
        const actionsLength = !!Object.keys(actions).length;
        !actionsLength && !fetching && !failed && getActions();
    }, [actions, fetching, failed, getActions]);

    if (!actions && fetching) return <Loader active />;

    if (!actions && failed)
        return <Message warning>Failed to load threads</Message>;

    return (
        <Segment>
            <Grid columns={2} divided>
                <Grid.Column width={4}>
                    <Header as="h2">Actions </Header>
                    <SideBarActions />
                </Grid.Column>
                <Grid.Column width={12}>Current Action placeholder</Grid.Column>
            </Grid>
        </Segment>
    );
};

export default Actions;
