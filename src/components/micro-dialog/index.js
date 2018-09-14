import React, { Component } from 'react';

import './styles.css';

class MicroDialog extends Component {
  render() {
    return(
      <div className='micro-dialog-container'>

        <i onClick={this.props.onClose}
          className={`fa fa-close micro-dialog-close-button`} />

        { this.props.children }

      </div>
    );
  }
}

export default MicroDialog;
