import React from 'react';

import Button from '../button';

import './styles.scss';

const Ability = ({ name, value, increment, decrement }) => {
    return (
        <>
            <div className="ability-score__container">
                <span className="ability-score__text">{name}:</span>
                <div className="ability-score__button ">
                    <Button
                        title=" "
                        icon="caret-right"
                        onClick={increment}
                        tiny={true}
                        noBorder={true}
                    />
                </div>
                <span className="ability-score__score-text">{value}</span>
                <div className="ability-score__button ">
                    <Button
                        title=" "
                        icon="caret-left"
                        onClick={decrement}
                        tiny={true}
                        noBorder={true}
                    />
                </div>
            </div>
        </>
    );
};

export default Ability;
