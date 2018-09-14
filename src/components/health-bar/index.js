import React, { Component } from 'react';

import './styles.css';

class HealthBar extends Component {
  render() {
    // dont show hp bars on full health player or monsters
    if(this.props.value === this.props.max) return null;

    return(
      <div className='health-bar-container'>
        <progress {...this.props} />
      </div>
    );
  }
}

export default HealthBar;
