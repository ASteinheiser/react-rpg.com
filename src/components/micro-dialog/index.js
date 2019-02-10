import React from 'react';

import './styles.scss';

const MicroDialog = ({ no_button, onClose, children, fullsize, className }) => {

  let styles = {};

  if(fullsize) {
    styles = { top: 0, bottom: 0, left: 0, right: 0 };
  }

  return(
    <div style={styles}
      className={`micro-dialog__container white-border ${className || ''}`}>

      {
        !no_button &&
          <button className='micro-dialog__close' onClick={onClose}>
            <i className={`fa fa-times`} />
          </button>
      }

      { children }

    </div>
  );
}

export default MicroDialog;
