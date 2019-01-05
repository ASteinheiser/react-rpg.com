import React from 'react';

import Button from '../button';
import Dialog from '../dialog';
import store  from '../../config/store';

import './styles.css';

const EndlessDialog = (props) => {

  const { text1, text2 } = props;

  function handleCloseDialog() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    });
  }

  return(
    <Dialog>

      <div className='flex-column endless-dialog-container'>

        <div className='endless-dialog-text'>
          { text1 || '' }
        </div>

        <div className='endless-dialog-text'>
          { text2 || '' }
        </div>

        <div className='endless-dialog-button'>
          <Button
            onClick={handleCloseDialog}
            title='Continue' />
        </div>
      </div>
    </Dialog>
  );
}

export default EndlessDialog;