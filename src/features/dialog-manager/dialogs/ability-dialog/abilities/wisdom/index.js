import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../../../components/button';

import decrementWisdom from '../../../../actions/decrement-wisdom';
import incrementWisdom from '../../../../actions/increment-wisdom';

const WisdomAbility = ({ stats, decrementWisdom, incrementWisdom }) => {
    const { wisdom } = stats.abilities;
    return (
        <>
            <div>
                <span className="ability-score-dialog__text">Wisdom:</span>
                <div className="ability-score-dialog__button">
                    <Button
                        title=" "
                        icon="chevron-left"
                        onClick={decrementWisdom}
                        tiny={true}
                        noBorder={true}
                    />
                    <span className="ability-score-dialog__score-text">
                        {wisdom}
                    </span>
                    <Button
                        title=" "
                        icon="chevron-right"
                        onClick={incrementWisdom}
                        tiny={true}
                        noBorder={true}
                    />
                </div>
            </div>
        </>
    );
};

const mapStateToProps = ({ stats }) => ({
    stats,
});

const actions = {
    decrementWisdom,
    incrementWisdom,
};
export default connect(mapStateToProps, actions)(WisdomAbility);
