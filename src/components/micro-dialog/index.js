import React from 'react';

import './styles.scss';

const MicroDialog = (props) => {

  const { no_button, onClose, children } = props;

  return(
    <div className={'micro-dialog-container white-border'}>

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
