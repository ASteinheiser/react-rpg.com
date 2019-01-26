import React from 'react';

import {
  GAME_VIEWPORT_SIZE,
  GAME_VIEWPORT_SIZE_LG
} from '../../config/constants';

import './viewport.scss';

const Viewport = (props) => {

  const { largeView } = props;

  const gameSize = (largeView ? GAME_VIEWPORT_SIZE_LG : GAME_VIEWPORT_SIZE);

  const viewportSize = {
    width: gameSize,
    height: gameSize
  };

  return(
    <div className='viewport-container white-border'
      style={viewportSize}>

      { props.children }

    </div>
  );
}

export default Viewport;