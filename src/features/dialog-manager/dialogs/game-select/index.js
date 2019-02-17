import React       from 'react';
import { connect } from 'react-redux';

import Button            from '../../../../components/button';
import Dialog            from '../../../../components/dialog';
import Flame             from '../../../../components/flame';
import mainGameDialog    from '../../actions/main-game-dialog';
import endlessGameDialog from '../../actions/endless-game-dialog';

import './styles.scss';

const GameSelect = ({ mainGameDialog, endlessGameDialog }) => {

  return(
    <Dialog>
      <span className='flex-row game-select__title'>
        {'React RPG'}
      </span>

      <span className='flex-column game-select__text'>
        {'Greetings, Traveler. Please, explore one of our dungeons...'}
      </span>

      <div className='game-select__flame--1'>
        <Flame />
      </div>
      <div className='game-select__flame--2'>
        <Flame />
      </div>

      <div className='flex-column game-select__button'>
        <Button
          style={{marginBottom: 16}}
          onClick={mainGameDialog}
          icon='torah'
          title={'Story Mode'} />

        <Button
          onClick={endlessGameDialog}
          icon='infinity'
          title={'Endless Mode'} />
      </div>
    </Dialog>
  );
}

const actions = { mainGameDialog, endlessGameDialog };

export default connect(null, actions)(GameSelect);
