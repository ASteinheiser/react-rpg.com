import React, { Component } from 'react';

import './styles.css';

class MicroDialog extends Component {
  render() {
    return(
      <div className={'micro-dialog-container' + (this.props.inventory_size ? ' micro-dialog-large' : '')}>

        <i onClick={this.props.onClose}
          className={`fa fa-times micro-dialog-close-button`} />

        { this.props.children }

      </div>
    );
  }
}

export default MicroDialog;
