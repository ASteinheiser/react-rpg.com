import React, { Component } from 'react';

import './styles.css';

class Button extends Component {

  handleClick() {
    const { onClick } = this.props;

    if(typeof onClick === 'function') {
      onClick();
    }
  }

  render() {
    const { icon, title, iconStyle, style, indicator } = this.props;

    if(!title) return null;

    return(
      <div className='button-container white-border' style={style || {}} onClick={this.handleClick.bind(this)}>
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
}

export default Button;
