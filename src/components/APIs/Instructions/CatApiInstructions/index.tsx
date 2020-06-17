import React from 'react';
import { GenericInstructions, InstructionsType } from '..';

const instructions: InstructionsType[] = [
    { header: 'To Get the Cat Api Key' },
    '1. Go to the cat api website and sign up',
    {
        link: {
            text: 'Sign Up Here on the Cat Api Website',
            href: 'https://thecatapi.com/signup',
        },
    },
    '2. You will get an email with the key in it.',
    '3. Copy the key from your email into the field on this page',
];

const CatApiInstructions = ({ api }: { api: string }) => (
    <GenericInstructions api={api} instructions={instructions} />
);

export default CatApiInstructions;
