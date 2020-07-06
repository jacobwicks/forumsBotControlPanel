import React, { useContext } from 'react';
import { InstructionsContext } from '../../../../services/InstructionsContext';

const InstructionsLink = () => {
    const { homepage } = useContext(InstructionsContext);

    return homepage ? (
        <a href={homepage} target="_blank" rel="noopener noreferrer">
            Instructions hosted on GitHub Pages
        </a>
    ) : (
        <></>
    );
};

export default InstructionsLink;
