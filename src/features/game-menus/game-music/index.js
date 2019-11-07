import React, { useState, useEffect } from 'react';
import { connect }                    from 'react-redux';
import Sound                          from 'react-sound';

import AmbientMusic     from './ambient-music.mp3';
import setGameSound     from '../actions/set-game-sound';
import gameSoundEnabled from '../actions/game-sound-enabled';

import './styles.scss';

const GameMusic = ({ sideMenu, gameSoundEnabled, setGameSound }) => {

  const [gameMusic, setGameMusic] = useState(null);

  useEffect(() => {
    window.addEventListener('mousedown', handleKeyPress);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('mousedown', handleKeyPress);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  function handleKeyPress() {
    // we have to load music only have user has clicked or pressed a key
    // chrome disables auto play until user has interacted with window
    if(gameSoundEnabled()) {
      setGameMusic(
        <Sound
          url={AmbientMusic}
          playStatus={'PLAYING'}
          autoLoad={true}
          loop={true}
          volume={50} />
      );
    }
    // now we no longer need our key or mouse event listeners
    window.removeEventListener('mousedown', handleKeyPress);
    window.removeEventListener('keydown', handleKeyPress);
  }

  function toggleMusic() {
    if(gameMusic) {
      turnOffSound();
    }
    else {
      turnOnSound();
    }
  }

  function handleFocus() {
    // make sure the player has music enabled before turning it back on
    if(gameSoundEnabled()) {
      turnOnSound();
    }
  }

  function handleBlur() {
    // during blur, don't change the sound redux state, just turn off music
    setGameMusic(null);
  }

  function turnOffSound() {
    setGameMusic(null);
    setGameSound(false);
  }

  function turnOnSound() {
    setGameMusic(
      <Sound
        url={AmbientMusic}
        playStatus={'PLAYING'}
        autoLoad={true}
        loop={true}
        volume={50} />
    );
    setGameSound(true);
  }

  return (
    <button className='game-music__button white-border'
      onClick={toggleMusic}
      style={{ marginTop: sideMenu ? 0 : 10 }}>

      <div className='game-music__diagonal-line--1'
        style={{
          width: gameMusic ? 0 : 57,
          top: gameMusic ? 0 : 18,
          left: gameMusic ? 0 : -7
        }}>
      </div>
      <div className='game-music__diagonal-line--2'
        style={{
          width: gameMusic ? 0 : 57,
          top: gameMusic ? 0 : 18,
          right: gameMusic ? 0 : -7
        }}>
      </div>

      <i className={`fa fa-${gameMusic ? 'volume-up' : 'volume-off'} game-music__icon`} />

      { gameMusic }

    </button>
  );
};

const actions = { gameSoundEnabled, setGameSound };

export default connect(null, actions)(GameMusic);
