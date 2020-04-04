import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';

import ConstitutionAbility from './abilities/constitution';
import DexterityAbility from './abilities/dexterity';
import StrengthAbility from './abilities/strength';
import WisdomAbility from './abilities/wisdom';
import IntelligenceAbility from './abilities/intelligence';

import closeDialog from '../../actions/close-dialog';
import Dialog from '../../../../components/dialog';

import './styles.scss';

const AbilityDialog = ({ stats, closeDialog }) => {
    return (
        <>
            <Dialog onKeyPress={closeDialog}>
                <div className="flex-column ability-score-dialog__container">
                    <span className="game-text-dialog__text">
                        Modify your Abilities
                    </span>
                    <ConstitutionAbility />
                    <DexterityAbility />
                    <StrengthAbility />
                    <WisdomAbility />
                    <IntelligenceAbility />
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
const actions = { closeDialog };
export default connect(mapStateToProps, actions)(AbilityDialog);
