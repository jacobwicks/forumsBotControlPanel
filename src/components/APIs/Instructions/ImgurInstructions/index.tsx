import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import GenericInstructions from '../GenericInstructions';
import GetTokenModal from './GetTokenModal';

const ImgurInstructions = ({ api }: { api: string }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const getTokenButton = (
        <Button onClick={() => setModalOpen(true)}>Get Token</Button>
    );

    const addChildren = [getTokenButton];

    return (
        <>
            <GenericInstructions api={api} addChildren={addChildren} />
            <GetTokenModal close={() => setModalOpen(false)} open={modalOpen} />
        </>
    );
};

export default ImgurInstructions;

// import React, { useState } from 'react';
// import { Button } from 'semantic-ui-react';
// import { InstructionsType, GenericInstructions } from '..';
// import GetTokenModal from './GetTokenModal';

// const imgurInstructions: InstructionsType[] = [
//     { header: 'To get the imgur api keys follow the 4 steps below.' },
//     'If you already have an account with imgur, you can skip step 1.',
//     '1. Register an Imgur account',
//     { link: { href: 'https://imgur.com/register' } },
//     '2. Log in to Imgur',
//     { link: { href: 'https://imgur.com/signin/' } },
//     '3. Register an application on Imgur',
//     'Registering an application will get you the client_id and client_secret.',
//     'Go to this link.',
//     { link: { href: 'https://api.imgur.com/oauth2/addclient' } },
//     "You'll need to log in with your imgur account if you haven't already.",
//     'Type the application name. It can be anything. I suggest something like "saForumsBot".',
//     'Select "OAuth 2 authorization without a callback URL"',
//     'Skip the Authorization callback url and website fields.',
//     'Fill in the email and description fields.',
//     'Do the captcha if there is one.',
//     'Click submit.',
//     'Copy and paste the client_id and client_secret into the fields on this screen.',
//     `The client_id is used to upload images "anonymously", meaning they don't go into one of the named albums on the account.`,
//     '4. Click the "Get Token" button to use your Imgur username and password to get the access token',
// ];

// const ImgurInstructions = ({ api }: { api: string }) => {
//     const [modalOpen, setModalOpen] = useState(false);

//     const getTokenButton = {
//         el: (
//             <Button key={'getTokenButton'} onClick={() => setModalOpen(true)}>
//                 Get Token
//             </Button>
//         ),
//     };

//     const extraChildren = [getTokenButton];

//     return (
//         <>
//             <GenericInstructions
//                 api={api}
//                 extraChildren={extraChildren}
//                 instructions={imgurInstructions}
//             />
//             <GetTokenModal close={() => setModalOpen(false)} open={modalOpen} />
//         </>
//     );
// };

// export default ImgurInstructions;
