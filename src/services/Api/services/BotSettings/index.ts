import { authFetchJSON } from '../AuthFetch';
import {
    BotFetchKeys,
    FrontEndBotSettings,
    BotActionTypes,
    BotAction,
} from '../../../../types';

interface BotSettingsResponse {
    settings: FrontEndBotSettings;
}

type BSR = BotSettingsResponse | undefined;

//gets the current settings for the bot
const getSettings = async () => {
    const route = 'settings';
    const settings = ((await authFetchJSON(route)) as BSR)?.settings;
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
