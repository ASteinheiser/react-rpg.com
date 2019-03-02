import React from 'react';

import Button from '../button';

import './styles.scss';

const ConfirmDialog = ({ open, text, onClose, cancelIcon, cancelText, confirm, acceptIcon, acceptText, className }) => {

  if(!open) return null;

  return(
    <div className={`confirm-dialog__container white-border ${className || ''}`}>

      <span className='confirm-dialog__text'>
        { text }
      </span>

      <div className='flex-row confirm-dialog__buttons'>
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
  );
};

export default ConfirmDialog;
