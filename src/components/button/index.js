import React from 'react';

import './styles.scss';

const Button = (props) => {

  const { icon, title, iconStyle, style, indicator, onClick, small } = props;

  function handleClick() {
    if(typeof onClick === 'function') {
      onClick();
    }
  }

  if(!title) return null;

  return(
    <div className={`button-container white-border ${small ? 'button-container-small' : ''}`}
      style={style || {}}
      onClick={handleClick}>
      {
        icon ?
          <i className={`fa fa-${icon} button-icon`}
            style={iconStyle ? iconStyle : {}}>
            {
              indicator ?
                <div className='button-indicator' />
                :
                null
            }
          </i>
          :
          null
      }
      <span>
        { title }
      </span>
    </div>
  );
}

export default Button;
