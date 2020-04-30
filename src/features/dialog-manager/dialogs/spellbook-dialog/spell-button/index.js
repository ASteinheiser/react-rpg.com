import React from 'react';

import EmptySlot from '../../../../../components/empty-slot';

import './styles.scss';

const SpellButton = ({ title, onClick, image, selected }) => {
    return (
        <button
            className={`spellbook-button__container white-border ${
                selected ? 'selected' : ''
            }`}
            onClick={onClick}
        >
            {image && (
                <EmptySlot className="white-border button__image">
                    <div
                        style={{
                            backgroundImage: `url('${image}')`,
                            width: '40px',
                            height: '40px',
                        }}
                    />
                </EmptySlot>
            )}

            <span>{title}</span>
            {selected && (
                <div className="active">
                    <span>Active Spell</span>
                </div>
            )}
        </button>
    );
};

export default SpellButton;
