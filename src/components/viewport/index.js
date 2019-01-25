import React from 'react';

import { GAME_VIEWPORT_SIZE } from '../../config/constants';

import './viewport.scss';

const Viewport = (props) => {

  const viewportSize = {
    width: GAME_VIEWPORT_SIZE,
    height: GAME_VIEWPORT_SIZE
  };

  return(
    <div className='viewport-container white-border'
      style={viewportSize}>

      { props.children }

    </div>
  );
}

export default Viewport;