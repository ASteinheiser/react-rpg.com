import React       from 'react';
import { connect } from 'react-redux';

import Button         from '../../../../components/button';
import Dialog         from '../../../../components/dialog';
import resetGameState from '../../../world/actions/reset-game-state';
import closeDialog    from '../../actions/close-dialog';

import './styles.scss';

const GameWin = ({ monsters, resetGameState, closeDialog }) => {

  const { components } = monsters;
  let monstersRemain = false;
  // check monsters by map
  Object.keys(components).forEach(mapId => {
    // see if there are any monsters on any maps
    if(Object.keys(components[mapId]).length > 0) {
      monstersRemain = true;
    }
  });

  // don't allow the player to win if any monsters remain
  return(
    <Dialog>
      {
        monstersRemain ?
          <>
            <span className='flex-row game-win__title'>
              {'You Are Weak...'}
            </span>

            <span className='flex-column game-win__text'>
              {'The shrine can only recognize you once every monster in the dungeon has been defeated...'}
            </span>

            <div className='flex-row game-win__button'>
              <Button
                onClick={closeDialog}
                icon='reply'
                title={'Return to Dungeon'} />
            </div>
          </>
          :
          <>
            <span className='flex-column game-win__text'>
              {'The old spirit speaks: "Greetings warrior! I cannot thank you enough for freeing me from the evil spirits. Now I may finally rest..."'}
            </span>

            <div className='flex-row game-win__button'>
              <Button
                onClick={resetGameState}
                icon='sync'
                title={'Play Again'} />
            </div>
          </>
      }
    </Dialog>
  );
};

const mapStateToProps = ({ monsters }) => ({ monsters });

const actions = { resetGameState, closeDialog };

export default connect(mapStateToProps, actions)(GameWin);
