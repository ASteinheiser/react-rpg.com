import React from 'react';

import Button from '../button';

import './styles.scss';

const Ability = ({ name, value, increment, decrement }) => {
    return (
        <>
            <div>
                <span className="ability-score-dialog__text">{name}:</span>
                <div className="ability-score-dialog__button">
                    <Button
                        title=" "
                        icon="chevron-left"
                        onClick={decrement}
                        tiny={true}
                        noBorder={true}
                    />
                    <span className="ability-score-dialog__score-text">
                        {value}
                    </span>
                    <Button
                        title=" "
                        icon="chevron-right"
                        onClick={increment}
                        tiny={true}
                        noBorder={true}
                    />
                </div>
            </div>
        </>
    );
};

export default Ability;
