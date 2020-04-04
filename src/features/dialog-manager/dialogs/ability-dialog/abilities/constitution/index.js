import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../../../components/button';

import decrementConstitution from '../../../../actions/decrement-constitution';
import incrementConstitution from '../../../../actions/increment-constitution';

import '../../styles.scss';

const ConstitutionAbility = ({
    stats,
    decrementConstitution,
    incrementConstitution,
}) => {
    const { constitution } = stats.abilities;
    return (
        <>
            <div>
                <span className="ability-score-dialog__text">
                    Constitution:
                </span>
                <div className="ability-score-dialog__button">
                    <Button
                        title=" "
                        icon="chevron-left"
                        onClick={decrementConstitution}
                        tiny={true}
                        noBorder={true}
                    />
                    <span className="ability-score-dialog__score-text">
                        {constitution}
                    </span>
                    <Button
                        title=" "
                        icon="chevron-right"
                        onClick={incrementConstitution}
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
    decrementConstitution,
    incrementConstitution,
};
export default connect(mapStateToProps, actions)(ConstitutionAbility);
