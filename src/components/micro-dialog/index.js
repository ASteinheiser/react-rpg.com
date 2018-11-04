import React from 'react';

import './styles.css';

const MicroDialog = (props) => {

  const { inventory_size, no_button, onClose, children } = props;

  return(
    <div className={'micro-dialog-container white-border' +
      (inventory_size ? ' micro-dialog-large' : '')}>

      {
        no_button ?
          null
          :
          <i onClick={onClose}
            className={`fa fa-times micro-dialog-close-button`} />
      }

      { children }

    </div>
  );
}

export default MicroDialog;
