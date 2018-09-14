import React, { Component } from 'react';

import './styles.css';

class Button extends Component {
  render() {
    const { icon, title } = this.props;

    if(!title) return null;

    return(
      <div className='button-container'>
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
