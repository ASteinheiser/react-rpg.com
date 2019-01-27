import React, { useState } from 'react';

import Button         from '../button';
import ConfirmDialog  from '../confirm-dialog';
import Dialog         from '../dialog';
import store          from '../../config/store';
import resetGameState from '../../modules/reset-game-state';

import './settings-dialog.scss';

const SettingsDialog = (props) => {

  const [confirmQuit, setConfirmQuit] = useState(false);

  function handleClose() {
    store.dispatch({
      type: 'CLOSE_SETTINGS',
      payload: {}
    });
  }

  return(
    <Dialog>
      <div className='flex-column settings-dialog-container'>
        <div className='settings-dialog-title'>
          {'Settings'}
        </div>

        <Button
          onClick={() => setConfirmQuit(true)}
          icon='caret-square-left'
          title='Return to Menu' />

        <Button
          onClick={handleClose}
          icon='times'
          title='Close' />
      </div>

      {
        confirmQuit ?
          <ConfirmDialog
            text='Are you sure you want to quit? You will lose all progress...'
            onClose={() => setConfirmQuit(false)}
            confirm={resetGameState} />
          :
          null
      }

    </Dialog>
  );
}

export default SettingsDialog;