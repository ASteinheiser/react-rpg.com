import React       from 'react';
import { connect } from 'react-redux';

import store from '../../../config/store';

import './styles.scss';

const GameSettings = ({ dialog }) => {

  function toggleSettings() {
    if(dialog.settings) {
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
    <button onClick={toggleSettings}
      className='game-settings__container white-border'>

      <i className={`fa fa-cog game-settings__button`} />

    </button>
  );
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(mapStateToProps)(GameSettings);