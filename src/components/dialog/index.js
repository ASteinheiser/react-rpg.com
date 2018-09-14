import React, { Component } from 'react';

import './styles.css';

class Dialog extends Component {
  render() {
    return(
      <div className='dialog-container'>

        { this.props.children }

      </div>
    );
  }
}

export default Dialog;
