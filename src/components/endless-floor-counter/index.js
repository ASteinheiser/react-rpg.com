import React from 'react';

import './styles.css';

const EndlessFloorCounter = (props) => {

  const { floor } = props;

  return(
    <div className='endless-floor-counter'>

      {'FLOOR'}

      <span className='endless-floor-value'>
        {floor}
      </span>
    </div>
  );
};

export default EndlessFloorCounter;