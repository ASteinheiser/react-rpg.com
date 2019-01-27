import React from 'react';

import {
  GAME_VIEWPORT_SIZE,
  GAME_VIEWPORT_SIZE_LG
} from '../../config/constants';

import './viewport.scss';

const Viewport = (props) => {

  const { largeView, sideMenu } = props;

  const gameSize = (largeView ? GAME_VIEWPORT_SIZE_LG : GAME_VIEWPORT_SIZE);
  const margin = sideMenu ? '8px 0 0' : '8px auto 0';

  const styles = {
    width: gameSize,
    height: gameSize,
    margin
  };

  return(
    <div className='viewport-container white-border'
      style={styles}>

      { props.children }

    </div>
  );
}

export default Viewport;