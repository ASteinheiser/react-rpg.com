import React from 'react';

import store from '../../config/store';

import './styles.scss';

const GameSettings = (props) => {

  function toggleSettings() {
    if(store.getState().world.settings) {
      store.dispatch({
        type: 'CLOSE_SETTINGS',
        payload: {}
      });
    } else {
      store.dispatch({
        type: 'OPEN_SETTINGS',
        payload: {}
      });
    }
  }

  return(
    <div className='game-settings-box white-border'
      onClick={toggleSettings}>
      <i className={`fa fa-cog game-settings-button`} />
    </div>
  );
}

export default GameSettings;