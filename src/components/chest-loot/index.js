import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button      from '../button';
import MicroDialog from '../micro-dialog';
import randomItem  from './random-item';
import store       from '../../config/store';

import './styles.scss';

const ChestLoot = (props) => {

  const { level } = props.stats;
  // give the player a 25% chance to get a random item
  let itemDrop = false;
  const chance = Math.floor(Math.random() * 100) + 1;
  if(chance <= 25) {
    itemDrop = randomItem(level);
  }
  const [item] = useState(itemDrop);
  // get a random amount of gold between 1 and 8 PLUS player level x2
  const [gold] = useState((Math.floor(Math.random() * 8) + 1) + (level * 2));
  // get some level based exp
  const [exp] = useState((level * 5) + 5);

  useEffect(() => {
    store.dispatch({
      type: 'GET_GOLD',
      payload: { value: gold }
    });
    store.dispatch({
      type: 'GET_EXP',
      payload: { value: exp }
    });
  }, []);  // we pass empty array as the second param to make this only call on mount and not on any updates

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []); // we pass empty array as the second param to make this only call on mount and not on any updates

  function handleKeyPress(event) {
    // case for 'enter' or 'space' key
    if(event.keyCode === 13 || event.keyCode === 32) {
      handleContinue();
    }
  }

  function handleContinue() {
    const { items, maxItems } = props.inventory;

    if(item) {
      if(items.length < maxItems) {
        store.dispatch({
          type: 'GET_ITEM',
          payload: item
        });
      } else {
        store.dispatch({
          type: 'TOO_MANY_ITEMS',
          payload: item
        });
      }
    }
    handleClose();
  }

  function handleClose() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: null }
    });
  }

  return(
    <MicroDialog onClose={handleClose}>

      <span className='chest-loot-title'>
        {'Chest Loot!'}
      </span>

      <div className='flex-column chest-loot-contents'>

        <div className='flex-row chest-loot-value-spacing'>
          <span>{'Gold: '}</span>
          <span>{gold}</span>
        </div>

        <div className='flex-row chest-loot-value-spacing'>
          <span>{'Exp: '}</span>
          <span>{exp}</span>
        </div>

        {
          item ?
            <div className='flex-row chest-loot-item'>
              <div style={{
                  backgroundImage: `url('${item.image}')`,
                  width: '40px',
                  height: '40px'
                }} />
                <span className='flex-column chest-loot-item-name'>
                  {item.name}
                </span>
            </div>
            :
            null
        }
      </div>

      <div className='flex-column chest-loot-button-container'>
        <Button
          onClick={handleContinue}
          title={item ? 'Pick Up' : 'Continue'}
          icon={item ? 'hand-paper' : 'check' }/>
      </div>

    </MicroDialog>
  );
}

const mapStateToProps = ({ inventory, stats }) => ({ inventory, stats });

export default connect(mapStateToProps)(ChestLoot);
