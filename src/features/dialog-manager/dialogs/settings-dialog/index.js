import React, { useState } from 'react';

import Button         from '../../../../components/button';
import ConfirmDialog  from '../../../../components/confirm-dialog';
import Dialog         from '../../../../components/dialog';
import store          from '../../../../config/store';
import resetGameState from '../../../../modules/reset-game-state';

import './settings-dialog.scss';

const SettingsDialog = () => {

  const [confirmQuit, setConfirmQuit] = useState(false);

  function handleClose() {
    store.dispatch({
      type: 'CLOSE_SETTINGS',
      payload: {}
    });
  }

  return(
    <Dialog>
      <div className='flex-column settings-dialog__container'>
        <span className='settings-dialog__title'>
          {'Settings'}
        </span>

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
        confirmQuit &&
          <ConfirmDialog
            text='Are you sure you want to quit? You will lose all progress...'
            onClose={() => setConfirmQuit(false)}
            confirm={resetGameState} />
      }

    </Dialog>
  );
}

export default SettingsDialog;