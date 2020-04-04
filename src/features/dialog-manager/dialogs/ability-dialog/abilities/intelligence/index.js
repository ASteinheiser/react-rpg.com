import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../../../components/button';

import decrementIntelligence from '../../../../actions/decrement-intelligence';
import incrementIntelligence from '../../../../actions/increment-intelligence';

import '../../styles.scss';

const IntelligenceAbility = ({
    stats,
    decrementIntelligence,
    incrementIntelligence,
}) => {
    const { intelligence } = stats.abilities;
    return (
        <>
            <div>
                <span className="ability-score-dialog__text">
                    Intelligence:
                </span>
                <div className="ability-score-dialog__button">
                    <Button
                        title=" "
                        icon="chevron-left"
                        onClick={decrementIntelligence}
                        tiny={true}
                        noBorder={true}
                    />
                    <span className="ability-score-dialog__score-text">
                        {intelligence}
                    </span>
                    <Button
                        title=" "
                        icon="chevron-right"
                        onClick={incrementIntelligence}
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
    decrementIntelligence,
    incrementIntelligence,
};
export default connect(mapStateToProps, actions)(IntelligenceAbility);
