import { BotAction, BotActionTypes, Timer } from '../../../../types/types';
import { authFetchJSON } from '../AuthFetch';
import { millisToMinutesAndSeconds } from '../../../MillisToMinutesAndSeconds';

interface TimerResponse {
    timer: number | undefined;
}

type TR = TimerResponse | undefined;

//gets the current settings for the bot
const getTimer = async () => {
    const route = 'timer';
    const response = ((await authFetchJSON(route)) as TR)?.timer;
    console.log(`timer response`, response);
    return response && millisToMinutesAndSeconds(response);
};

export const loadTimer = async (dispatch: React.Dispatch<BotAction>) => {
    const timer = await getTimer();
    timer && dispatch({ type: BotActionTypes.setTimer, timer });
};
