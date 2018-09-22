import React, { Component } from 'react';

import './styles.css';

class HealthBar extends Component {
  render() {
    // dont show hp bars on full health units
    return(
      <span className='flex-row'>
        <span className='health-bar-container'
          style={{
            width: (this.props.value === this.props.max) ? 0 : '38px',
            border: (this.props.value === this.props.max) ? '' : '1px solid var(--green)',
          }}>
          <span className='health-bar-value'
            style={{ width: `${(this.props.value / this.props.max) * 100}%` }}>
          </span>
        </span>
      </span>
    );
  }
}

export default HealthBar;
