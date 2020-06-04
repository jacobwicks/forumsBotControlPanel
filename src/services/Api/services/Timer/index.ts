import { BotAction, BotActionTypes, Timer } from '../../../../types/types';
import { authFetchJSON } from '../AuthFetch';
import { millisToMinutesAndSeconds } from '../../../MillisToMinutesAndSeconds';

interface TimerResponse {
    timer: number | undefined;
}

type TR = TimerResponse | undefined;

//gets the current settings for the bot
const getTimer = async (): Promise<Timer> => {
    const route = 'timer';
    const response = ((await authFetchJSON(route)) as TR)?.timer;

    return response
        ? millisToMinutesAndSeconds(response)
        : {
              minutes: 0,
              seconds: 0,
          };
};

export const loadTimer = async (dispatch: React.Dispatch<BotAction>) => {
    const timer = await getTimer();
    dispatch({ type: BotActionTypes.setTimer, timer });
};
