import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import MicroDialog from '../../../../components/micro-dialog';
import closeLevelUpDialog from '../../actions/close-level-up-dialog';
import abilityScoreDialog from '../../actions/ability-score-dialog';

import isAbilityAllocationLevel from '../../../../utils/is-ability-allocation-level';

import './styles.scss';

const LevelUp = ({ stats, closeLevelUpDialog, abilityScoreDialog }) => {
    const { level, levelUp } = stats;
    const { hp, mana } = levelUp;

    const nextDialog = isAbilityAllocationLevel(level)
        ? () => {
              abilityScoreDialog(true);
          }
        : closeLevelUpDialog;

    return (
        <MicroDialog onClose={nextDialog} onKeyPress={nextDialog}>
            <span className="level-up__title">
                Level<span className="level-up__level">{` ${level}`}</span>
            </span>

            <div className="flex-column level-up__contents">
                {hp !== 0 && (
                    <div className="level-up__value--spacing">
                        Gained<span className="level-up__hp">{` +${hp} `}</span>
                        Hp
                    </div>
                )}
            </div>

            <div className="flex-column level-up__contents">
                {mana !== 0 && (
                    <div className="level-up__value--spacing">
                        Gained
                        <span className="level-up__mana">{` +${mana} `}</span>
                        Mana
                    </div>
                )}
            </div>

            <div className="flex-column level-up__buttons">
                <Button onClick={nextDialog} title={'Okay'} icon={'check'} />
            </div>
        </MicroDialog>
    );
};

const mapStateToProps = ({ stats }) => ({ stats });

const actions = { closeLevelUpDialog, abilityScoreDialog };

export default connect(mapStateToProps, actions)(LevelUp);
