import React from 'react';

import './styles.scss';

const MicroDialog = (props) => {

  const { no_button, onClose, children, fullsize, className } = props;

  let styles = {};

  if(fullsize) {
    styles = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    };
  }

  return(
    <div className={'micro-dialog-container white-border ' + (className || '')} style={styles}>

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
