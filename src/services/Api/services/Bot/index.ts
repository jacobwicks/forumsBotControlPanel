import authFetch from '../AuthFetch';
import { BotAction, BotActionTypes } from '../../../../types';
import setValue from '../SetValue';

const runOnce = async () => {
    const route = 'runOnce';
    const response = await authFetch(route);
    console.log(`runOnce ${response?.status === 200}`);
};

const startBot = async (dispatch: React.Dispatch<BotAction>) => {
    const configKeys = ['settings', 'running'];
    const value = true;

    dispatch({ type: BotActionTypes.start });

    const started = await setValue({
        configKeys,
        value,
    });

    !started && dispatch({ type: BotActionTypes.stop });
};

const stopBot = async (dispatch: React.Dispatch<BotAction>) => {
    const configKeys = ['settings', 'running'];
    const value = false;

    dispatch({ type: BotActionTypes.stop });

    const stopped = await setValue({
        configKeys,
        value,
    });

    !stopped && dispatch({ type: BotActionTypes.stop });
};

export { startBot, stopBot, runOnce };
