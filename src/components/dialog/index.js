import React from 'react';

import './styles.scss';

const Dialog = (props) => {
  return(
    <div className='dialog-container white-border'>
      { props.children }
    </div>
  );
}

export default Dialog;
