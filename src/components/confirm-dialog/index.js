import React from 'react';

import Button from '../button';

import './styles.scss';

const ConfirmDialog = (props) => {

  const { text, onClose, cancelIcon, cancelText, confirm, acceptIcon, acceptText, className } = props;

  return(
    <div className={`confirm-dialog-container white-border ${className ? className : ''}`}>

      <span className='confirm-dialog-text'>
        { text }
      </span>

      <div className='flex-column confirm-dialog-button-parent'>
        <div className='flex-row confirm-dialog-button-child'>
          <Button
            onClick={onClose}
            icon={cancelIcon || 'times'}
            title={cancelText || 'No'} />

          <Button
            onClick={confirm}
            icon={acceptIcon || 'check'}
            title={acceptText || 'Yes'} />
        </div>
      </div>

    </div>
  );
}

export default ConfirmDialog;
