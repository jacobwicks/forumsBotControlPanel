import authFetch from '../AuthFetch';
import expectJSON from '../ExpectJSON';
import {
    BotFetchKeys,
    BotSettings,
    BotActionTypes,
    BotAction,
} from '../../../../types';

//gets the current settings for the bot
const getSettings = async () => {
    const route = 'settings';
    const response = await expectJSON(authFetch(route));
    const settings: BotSettings | undefined = response?.settings;
    return settings;
};

const loadSettings = async (dispatch: React.Dispatch<BotAction>) => {
    dispatch({ type: BotActionTypes.fetchAttempt, key: BotFetchKeys.settings });
    const settings = await getSettings();
    if (settings) {
        dispatch({
            type: BotActionTypes.fetchSuccess,
            key: BotFetchKeys.settings,
            content: settings,
        });
    } else
        dispatch({
            type: BotActionTypes.fetchFailure,
            key: BotFetchKeys.settings,
        });
};

export default loadSettings;
