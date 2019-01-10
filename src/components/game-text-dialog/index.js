import React, { useEffect } from 'react';

import Button from '../button';
import Dialog from '../dialog';
import store  from '../../config/store';

import './styles.css';

const GameTextDialog = (props) => {

  const { text1, text2 } = props;

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
      payload: { component: null }
    });
  }

  return(
    <Dialog>

      <div className='flex-column game-text-dialog-container'>

        <div className='game-text-dialog-text'>
          { text1 || '' }
        </div>

        <div className='game-text-dialog-text'>
          { text2 || '' }
        </div>

        <div className='game-text-dialog-button'>
          <Button
            onClick={handleCloseDialog}
            title='Continue' />
        </div>
      </div>
    </Dialog>
  );
}

export default GameTextDialog;