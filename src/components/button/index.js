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
    const { icon, title } = this.props;

    if(!title) return null;

    return(
      <div className='button-container' onClick={this.handleClick.bind(this)}>
        {
          icon ?
            <i className={`fa fa-${icon} button-icon`} />
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
