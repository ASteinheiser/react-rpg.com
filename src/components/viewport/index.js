import React from 'react';

import './viewport.scss';

const Viewport = (props) => {

  const viewportSize = {
    width: 320,
    height: 320
  };

  return(
    <div className='viewport-container white-border'
      style={viewportSize}>

      { props.children }

    </div>
  );
}

export default Viewport;