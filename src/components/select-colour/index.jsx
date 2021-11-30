import React from 'react';
import ColourPicker from '../colour-picker';

import './styles.scss';

const SelectColour = ({ name, onChange }) => {
    return (
        <div className="character-customisation__option">
            <span className="character-customisation__label">{name}</span>
            <div className="character-customisation__picker">
                <ColourPicker onChange={onChange} />
            </div>
        </div>
    );
};

export default SelectColour;
