import { AlbumsAction, BotAction } from '../../../../types';

//dispatches all actions
const dispatchAll = ({
    dispatch,
    actions,
}: {
    dispatch: (action: AlbumsAction | BotAction) => void;
    actions?: [AlbumsAction | BotAction];
}) => dispatch && actions && actions.forEach((action) => dispatch(action));

export default dispatchAll;
