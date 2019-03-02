import React from 'react';

import './styles.scss';

const HealthBar = ({ value, max }) => {
  // hide hp bars on full health units
  const fullHp = (value === max);

  return(
    <span className='flex-row'>
      <span className='health-bar__container'
        style={{
          width: fullHp ? 0 : 38,
          border: fullHp ? 'none' : '1px solid var(--green)'
        }}>

        <span className='health-bar__value'
          style={{ width: `${(value / max) * 100}%` }} />

      </span>
    </span>
  );
};

export default HealthBar;
