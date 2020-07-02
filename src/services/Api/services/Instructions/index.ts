import { openFetchJSON } from '../OpenFetch';
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
import authFetch from '../AuthFetch';

interface InstructionsResponse {
    actions: string;
    albums: AlbumInstruction[];
    bot: SAUser;
    general: string;
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

    const threads = instructions?.threads || [];

    dispatch({
        type: InstructionsActionTypes.setInstructions,
        instructions: {
            actions,
            albums,
            bot,
            general,
            threads,
        },
    });

    dispatch({ type: InstructionsActionTypes.done });
};

export const saveInstructions = async (instructions: any) => {
    const route = 'saveInstructions';

    const body = { instructions };
    const success = (await authFetch(route, true, body))?.status === 200;

    success
        ? console.log('instructions saved')
        : console.log('failed to save instructions');
};
