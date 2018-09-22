import React, { Component } from 'react';

import Button from '../button';

import './styles.css';

class ConfirmDialog extends Component {
  render() {
    return(
      <div className='confirm-dialog-container white-border'>

        <span className='confirm-dialog-text'>
          { this.props.text }
        </span>

        <div className='flex-column confirm-dialog-button-parent'>
          <div className='flex-row confirm-dialog-button-child'>
            <Button
              onClick={this.props.onClose}
              icon={this.props.cancelIcon}
              title={this.props.cancelText} />

            <Button
              onClick={this.props.confirm}
              icon={this.props.acceptIcon}
              title={this.props.acceptText} />
          </div>
        </div>

      </div>
    );
  }
}

export default ConfirmDialog;
