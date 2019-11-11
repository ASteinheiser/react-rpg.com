import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import MicroDialog from '../../../../components/micro-dialog';
import closeLevelUpDialog from '../../actions/close-level-up-dialog';

import './styles.scss';

const LevelUp = ({ stats, closeLevelUpDialog }) => {

  const { level, levelUp } = stats;
  const { dmg, hp } = levelUp;

  return(
    <MicroDialog
      onClose={closeLevelUpDialog}
      onKeyPress={closeLevelUpDialog}>

      <span className='level-up__title'>
        Level<span className='level-up__level'>{` ${level}`}</span>
      </span>

      <div className='flex-column level-up__contents'>
        <div className='level-up__value--spacing'>
          Gained<span className='level-up__hp'>{` +${hp} `}</span>Hp
        </div>

        <div className='level-up__value--spacing'>
          Gained<span className='level-up__dmg'>{` +${dmg} `}</span>Attack
        </div>
      </div>

      <div className='flex-column level-up__buttons'>
        <Button
          onClick={closeLevelUpDialog}
          title={'Okay'}
          icon={'check'} />
      </div>

    </MicroDialog>
  );
};

const mapStateToProps = ({ stats }) => ({ stats });

const actions = { closeLevelUpDialog };

export default connect(mapStateToProps, actions)(LevelUp);
