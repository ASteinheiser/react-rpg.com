import React, { useEffect } from 'react';

import Button from '../../../../components/button';
import Dialog from '../../../../components/dialog';
import store  from '../../../../config/store';

import './styles.scss';

const GameTextDialog = ({ text1, text2 }) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []); // we pass empty array as the second param to make this only call on mount and not on any updates

  function handleKeyPress(event) {
    // case for 'enter' or 'space' key
    if(event.keyCode === 13 || event.keyCode === 32) {
      handleCloseDialog();
    }
  }

  function handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { pause: false }
    });
  }

  return(
    <Dialog>

      <div className='flex-column game-text-dialog__container'>

        <span className='game-text-dialog__text'>
          { text1 || '' }
        </span>

        <span className='game-text-dialog__text'>
          { text2 || '' }
        </span>

        <div className='game-text-dialog__button'>
          <Button
            onClick={handleCloseDialog}
            title='Continue' />
        </div>
      </div>
    </Dialog>
  );
}

export default GameTextDialog;