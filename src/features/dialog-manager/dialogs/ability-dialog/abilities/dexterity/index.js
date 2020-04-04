import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../../../components/button';

import decrementDexterity from '../../../../actions/decrement-dexterity';
import incrementDexterity from '../../../../actions/increment-dexterity';

import '../../styles.scss';

const DexterityAbility = ({
    stats,
    decrementDexterity,
    incrementDexterity,
}) => {
    const { dexterity } = stats.abilities;
    return (
        <>
            <div>
                <span className="ability-score-dialog__text">Dexterity:</span>
                <div className="ability-score-dialog__button">
                    <Button
                        title=" "
                        icon="chevron-left"
                        onClick={decrementDexterity}
                        tiny={true}
                        noBorder={true}
                    />
                    <span className="ability-score-dialog__score-text">
                        {dexterity}
                    </span>
                    <Button
                        title=" "
                        icon="chevron-right"
                        onClick={incrementDexterity}
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
    decrementDexterity,
    incrementDexterity,
};
export default connect(mapStateToProps, actions)(DexterityAbility);
