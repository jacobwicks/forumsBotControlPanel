import { apiUrl } from '../../index';
import authFetch from '../AuthFetch';
import expectJSON from '../ExpectJSON';
import { BotSettings, BotActionTypes, BotAction } from '../../../../types';

//gets the current settings for the bot
const getSettings = async () => {
    const route = 'settings';
    const url = `${apiUrl}${route}`;
    const response = await expectJSON(authFetch(url));
    const settings: BotSettings | undefined = response?.settings;
    return settings;
};

const loadSettings = async (dispatch: React.Dispatch<BotAction>) => {
    dispatch({ type: BotActionTypes.fetchSettingsAttempt });
    const settings = await getSettings();
    if (settings) {
        dispatch({ type: BotActionTypes.fetchSettingsSuccess, settings });
    } else dispatch({ type: BotActionTypes.fetchSettingsFailure });
};

export default loadSettings;
