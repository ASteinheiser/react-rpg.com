import React, { useEffect } from 'react';

import './styles.scss';

const MicroDialog = ({ noButton, onClose, children, fullsize, className, onKeyPress }) => {

  useEffect(() => {
    if(onKeyPress) window.addEventListener('keydown', handleKeyPress);
    return () => {
      if(onKeyPress) window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  function handleKeyPress(event) {
    // case for 'enter' or 'space' key
    if(event.keyCode === 13 || event.keyCode === 32) {
      onKeyPress();
    }
  }

  const noSpacing = { top: 0, bottom: 0, left: 0, right: 0 };

  return(
    <div style={fullsize ? noSpacing : {}}
      className={`micro-dialog__container white-border ${className || ''}`}>

      {
        !noButton &&
          <button className='micro-dialog__close' onClick={onClose}>
            <i className={`fa fa-times`} />
          </button>
      }

      { children }

    </div>
  );
};

export default MicroDialog;
