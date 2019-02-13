import React from 'react';

import './styles.scss';

const HealthBar = ({ value, max }) => {
  // hide hp bars on full health units
  if(value === max) return null;

  return(
    <span className='flex-row'>
      <span className='health-bar__container'>

        <span className='health-bar__value'
          style={{ width: `${(value / max) * 100}%` }} />

      </span>
    </span>
  );
}

export default HealthBar;
