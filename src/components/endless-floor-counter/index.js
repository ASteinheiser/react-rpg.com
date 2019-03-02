import React from 'react';

import './styles.scss';

const EndlessFloorCounter = ({ floor }) => {
  return(
    <div className='floor-counter__container'>

      <span>{'FLOOR'}</span>

      <span className='floor-counter__value'>
        { floor }
      </span>
    </div>
  );
};

export default EndlessFloorCounter;