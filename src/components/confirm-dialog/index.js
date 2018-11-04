import React from 'react';

import Button from '../button';

import './styles.css';

const ConfirmDialog = (props) => {

  const { text, onClose, cancelIcon, cancelText, confirm, acceptIcon, acceptText } = props;

  return(
    <div className='confirm-dialog-container white-border'>

      <span className='confirm-dialog-text'>
        { text }
      </span>

      <div className='flex-column confirm-dialog-button-parent'>
        <div className='flex-row confirm-dialog-button-child'>
          <Button
            onClick={onClose}
            icon={cancelIcon}
            title={cancelText} />

          <Button
            onClick={confirm}
            icon={acceptIcon}
            title={acceptText} />
        </div>
      </div>

    </div>
  );
}

export default ConfirmDialog;
