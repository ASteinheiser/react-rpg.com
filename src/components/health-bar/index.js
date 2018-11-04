import React from 'react';

import './styles.css';

const HealthBar = ({ value, max }) => {
  // dont show hp bars on full health units
  return(
    <span className='flex-row'>
      <span className='health-bar-container'
        style={{
          width: (value === max) ? 0 : '38px',
          border: (value === max) ? '' : '1px solid var(--green)',
        }}>
        <span className='health-bar-value'
          style={{ width: `${(value / max) * 100}%` }}>
        </span>
      </span>
    </span>
  );
}

export default HealthBar;
