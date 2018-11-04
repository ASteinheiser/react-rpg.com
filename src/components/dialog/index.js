import React from 'react';

import './styles.css';

const Dialog = (props) => {
  return(
    <div className='dialog-container white-border'>
      { props.children }
    </div>
  );
}

export default Dialog;
