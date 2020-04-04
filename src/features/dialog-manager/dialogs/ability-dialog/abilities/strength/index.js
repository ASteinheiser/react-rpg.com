import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../../../components/button';

import decrementStrength from '../../../../actions/decrement-strength';
import incrementStrength from '../../../../actions/increment-strength';

const StrengthAbility = ({ stats, decrementStrength, incrementStrength }) => {
    const { strength } = stats.abilities;
    return (
        <>
            <div>
                <span className="ability-score-dialog__text">Strength:</span>
                <div className="ability-score-dialog__button">
                    <Button
                        title=" "
                        icon="chevron-left"
                        onClick={decrementStrength}
                        tiny={true}
                        noBorder={true}
                    />
                    <span className="ability-score-dialog__score-text">
                        {strength}
                    </span>
                    <Button
                        title=" "
                        icon="chevron-right"
                        onClick={incrementStrength}
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
    decrementStrength,
    incrementStrength,
};
export default connect(mapStateToProps, actions)(StrengthAbility);
