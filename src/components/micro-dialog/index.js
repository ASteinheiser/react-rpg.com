import React, { Component } from 'react';

import './styles.css';

class MicroDialog extends Component {
  render() {
    return(
      <div className='micro-dialog-container'>

        { this.props.children }

      </div>
    );
  }
}

export default MicroDialog;
