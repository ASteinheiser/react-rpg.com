import React from 'react';

import './styles.scss';

const DicePage = () => {
    return (
        <div className="flex-column tutorial-dice__container">
            <div className="tutorial-page__title">{'DICE NOTATION'}</div>
            <div className="tutorial-page__dice">
                {
                    'This game uses dice notation for representing various values, such as damage dealt by a weapon or amount healed by a spell.'
                }
                <br />
                <br />
                <span style={{ textDecoration: 'underline' }}>
                    {'Examples'}
                </span>
                <br />
                <br />
                {
                    "'1d4 + 2' means roll a 4-sided die once, then add 2 to the result."
                }
                <br />
                {"'2d8' means roll an 8-sided die twice, and sum the results."}
            </div>
        </div>
    );
};

export default DicePage;
