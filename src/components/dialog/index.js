import React from 'react';

import './styles.scss';

const Dialog = ({ children, goBack }) => {
  return(
    <div className='dialog__container white-border'>
      {
        goBack &&
          <button onClick={goBack} className='dialog__back-button'>
            <i className={`fa fa-arrow-left`} />
          </button>
      }
      { children }
    </div>
  );
}

export default Dialog;
