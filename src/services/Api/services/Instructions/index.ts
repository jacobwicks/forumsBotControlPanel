import openFetch, { openFetchJSON } from '../OpenFetch';
import {
    ActionInstruction,
    AlbumInstruction,
    InstructionsAction,
    InstructionsActionTypes,
    SAUser,
    dummySAUser,
    FrontEndThread,
} from '../../../../types/types';
import { reviver } from '../../../JSONParseRegExReviver';

interface InstructionsResponse {
    actions: string;
    albums: AlbumInstruction[];
    bot: SAUser;
    general: string;
    homepage?: string;
    threads: FrontEndThread[];
}

type IR = InstructionsResponse | undefined;

export const getInstructions = async (
    dispatch: React.Dispatch<InstructionsAction>
) => {
    dispatch({ type: InstructionsActionTypes.fetchAttempt });

    const route = 'instructions';
    const instructions = (await openFetchJSON(route)) as IR;

    const actions: ActionInstruction[] = instructions?.actions
        ? JSON.parse(instructions.actions, reviver)
        : [];

    const albums = instructions?.albums || [];

    const bot = instructions?.bot || dummySAUser;

    const general = instructions?.general || '';

    const homepage = instructions?.homepage || '';

    const threads = instructions?.threads || [];

    dispatch({
        type: InstructionsActionTypes.setInstructions,
        instructions: {
            actions,
            albums,
            bot,
            general,
            homepage,
            threads,
        },
    });

    dispatch({ type: InstructionsActionTypes.done });
};

export const saveInstructions = async () => {
    const route = 'saveInstructions';

    const success = (await openFetch(route))?.status === 200;

    success
        ? console.log('instructions saved')
        : console.log('failed to save instructions');

    return success;
};
