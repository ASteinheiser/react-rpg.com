import React       from 'react';
import { connect } from 'react-redux';

import Button         from '../button';
import Dialog         from '../dialog';
import resetGameState from '../../modules/reset-game-state';
import store          from '../../config/store';

import './styles.scss';

const GameWin = (props) => {

  function handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: null }
    });
  }

  const { components } = props.monsters;
  let monstersRemain = false;
  // check monsters by map
  Object.keys(components).forEach(mapId => {
    // see if there are any monsters on any maps
    if(Object.keys(components[mapId]).length > 0) {
      monstersRemain = true;
    }
  });
  // player has defeated all enemies!
  if(!monstersRemain) {
    return(
      <Dialog>
        <span className='flex-column game-win-text'>
          {'The old spirit speaks: "Greetings warrior! I cannot thank you enough for freeing me from the evil spirits. Now I may finally rest..."'}
        </span>

        <div className='flex-row game-win-button'>
          <Button
            onClick={resetGameState}
            icon='sync'
            title={'Play Again'} />
        </div>
      </Dialog>
    );
  }
  // player hasn't killed all enemies
  return(
    <Dialog>
      <span className='flex-row game-win-title'>
        {'You Are Weak...'}
      </span>

      <span className='flex-column game-win-text'>
        {'The shrine can only recognize you once every monster in the dungeon has been defeated...'}
      </span>

      <div className='flex-row game-win-button'>
        <Button
          onClick={handleCloseDialog}
          icon='reply'
          title={'Return to Dungeon'} />
      </div>
    </Dialog>
  );
}

const mapStateToProps = ({ monsters }) => ({ monsters });

export default connect(mapStateToProps)(GameWin);
