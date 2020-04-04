import React from 'react';
import { connect } from 'react-redux';

import Ability from '../../../../components/ability';
import Button from '../../../../components/button';

import decrementIntelligence from './actions/decrement-intelligence';
import incrementIntelligence from './actions/increment-intelligence';
import decrementWisdom from './actions/decrement-wisdom';
import incrementWisdom from './actions/increment-wisdom';
import decrementStrength from './actions/decrement-strength';
import incrementStrength from './actions/increment-strength';
import decrementConstitution from './actions/decrement-constitution';
import incrementConstitution from './actions/increment-constitution';
import decrementDexterity from './actions/decrement-dexterity';
import incrementDexterity from './actions/increment-dexterity';

import closeDialog from '../../actions/close-dialog';
import Dialog from '../../../../components/dialog';

import './styles.scss';

const AbilityDialog = ({
    stats,
    closeDialog,
    incrementIntelligence,
    decrementIntelligence,
    decrementWisdom,
    incrementWisdom,
    decrementStrength,
    incrementStrength,
    decrementConstitution,
    incrementConstitution,
    decrementDexterity,
    incrementDexterity,
}) => {
    const {
        constitution,
        dexterity,
        intelligence,
        strength,
        wisdom,
    } = stats.abilities;
    return (
        <>
            <Dialog onKeyPress={closeDialog}>
                <div className="flex-column ability-score-dialog__container">
                    <span className="game-text-dialog__text">
                        Modify your Abilities
                    </span>
                    <Ability
                        name="Constitution"
                        value={constitution}
                        increment={incrementConstitution}
                        decrement={decrementConstitution}
                    />
                    <Ability
                        name="Dexterity"
                        value={dexterity}
                        increment={incrementDexterity}
                        decrement={decrementDexterity}
                    />
                    <Ability
                        name="Intelligence"
                        value={intelligence}
                        increment={incrementIntelligence}
                        decrement={decrementIntelligence}
                    />
                    <Ability
                        name="Strength"
                        value={strength}
                        increment={incrementStrength}
                        decrement={decrementStrength}
                    />
                    <Ability
                        name="Wisdom"
                        value={wisdom}
                        increment={incrementWisdom}
                        decrement={decrementWisdom}
                    />
                    <span className="ability-score-dialog__text">
                        Ability Points remaining:{' '}
                        <span className="ability-score-dialog__button">
                            {stats.points}
                        </span>
                    </span>
                    <Button
                        title="Confirm"
                        onClick={closeDialog}
                        small={true}
                    />
                </div>
            </Dialog>
        </>
    );
};

const mapStateToProps = ({ stats }) => ({ stats });
const actions = {
    closeDialog,
    incrementIntelligence,
    decrementIntelligence,
    decrementWisdom,
    incrementWisdom,
    decrementStrength,
    incrementStrength,
    decrementConstitution,
    incrementConstitution,
    decrementDexterity,
    incrementDexterity,
};
export default connect(mapStateToProps, actions)(AbilityDialog);
