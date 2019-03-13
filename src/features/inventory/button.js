import React, { Component } from 'react';

import Button from '../../components/button';

class InventoryButton extends Component {
  componentDidMount() {
    // Attach this to listen for the inventory toggle key.
    window.addEventListener('keydown', this.props.onKeyDown);
  }

  componentWillUnmount() {
    // Clean up the event listener when this component unmounts.
    window.removeEventListener('keydown', this.props.onKeyDown);
  }

  render() {
    return (
      <Button {...this.props} />
    );
  }
}

export default InventoryButton;
