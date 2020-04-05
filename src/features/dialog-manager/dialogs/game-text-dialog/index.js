import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import abilityScoreDialog from '../../actions/ability-score-dialog';

import './styles.scss';

const GameTextDialog = ({ text1, text2, abilityScoreDialog }) => {
    return (
        <Dialog onKeyPress={abilityScoreDialog}>
            <div className="flex-column game-text-dialog__container">
                <span className="game-text-dialog__text">{text1 || ''}</span>

                <span className="game-text-dialog__text">{text2 || ''}</span>

                <div className="game-text-dialog__button">
                    <Button onClick={abilityScoreDialog} title="Continue" />
                </div>
            </div>
        </Dialog>
    );
};

const actions = { abilityScoreDialog };

export default connect(null, actions)(GameTextDialog);
