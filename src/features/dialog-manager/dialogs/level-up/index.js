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
        {`Level ${level} reached!`}
      </span>

      <div className='flex-column level-up__contents'>
        <div className='flex-row level-up__value--spacing'>
          <span>{`Gained +${hp} Hp`}</span>
        </div>

        <div className='flex-row level-up__value--spacing'>
          <span>{`Gained +${dmg} Dmg`}</span>
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
