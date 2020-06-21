import {
    AlbumsAction,
    BotAction,
    ThreadsAction,
} from '../../../../types/types';

//dispatches all actions
const dispatchAll = ({
    dispatch,
    actions,
}: {
    dispatch: (action: AlbumsAction | BotAction | ThreadsAction) => void;
    actions?: [AlbumsAction | BotAction | ThreadsAction];
}) => dispatch && actions && actions.forEach((action) => dispatch(action));

export default dispatchAll;
