import React from 'react';

import D4 from './assets/dice/d4.png';
import D6 from './assets/dice/d6.png';
import D8 from './assets/dice/d8.png';
import D10 from './assets/dice/d10.png';
import D20 from './assets/dice/d20.png';

import './styles.scss';

const DicePage = () => {
    return (
        <div className="flex-column tutorial-dice__container">
            <div className="tutorial-page__title">{'DICE NOTATION'}</div>
            <div className="tutorial-page__dice">
                {
                    'This game uses dice notation for representing various values, such as the damage dealt in combat.'
                }
                <br />
                <br />
                <span style={{ textDecoration: 'underline' }}>
                    {'Examples'}
                </span>
                <br />
                {
                    "'1d4 + 2' means roll a 4-sided die once, then add 2 to the result."
                }
                <br />
                {"'2d8' means roll an 8-sided die twice, and sum the results."}
                <div className="tutorial-page__dice-types">
                    <img src={D4} alt="four-sided dice" width={50} />
                    <img src={D6} alt="six-sided dice" width={50} />
                    <img src={D8} alt="eight-sided dice" width={50} />
                    <img src={D10} alt="ten-sided dice" width={50} />
                    <img src={D20} alt="twenty-sided dice" width={50} />
                </div>
            </div>
        </div>
    );
};

export default DicePage;
