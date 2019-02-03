import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Button      from '../../../../components/button';
import MicroDialog from '../../../../components/micro-dialog';
import randomItem  from './random-item';
import store       from '../../../../config/store';

import './styles.scss';

const ChestLoot = (props) => {

  const { level } = props.stats;

  const { chestOpen } = props.dialog;
  const { gold, exp, item } = chestOpen;

  useEffect(() => {
    if(!chestOpen) {
      // give the player a 25% chance to get a random item
      let itemDrop = false;
      const chance = Math.floor(Math.random() * 100) + 1;
      if(chance <= 25) {
        itemDrop = randomItem(level);
      }
      // get a random amount of gold between 1 and 8 PLUS player level x3
      const gold = (Math.floor(Math.random() * 8) + 1) + (level * 3);
      // get some level based exp
      const exp = (level * 5) + 5;

      store.dispatch({
        type: 'GET_GOLD',
        payload: { value: gold }
      });
      store.dispatch({
        type: 'GET_EXP',
        payload: { value: exp }
      });
      store.dispatch({
        type: 'SET_CHEST_DATA',
        payload: {
          exp,
          gold,
          item: itemDrop
        }
      });
    }
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
    const { item } = store.getState().dialog.chestOpen;

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
      type: 'SET_CHEST_DATA',
      payload: false
    });
    store.dispatch({
      type: 'PAUSE',
      payload: { pause: false }
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

const mapStateToProps = ({ inventory, stats, dialog }) => ({ inventory, stats, dialog });

export default connect(mapStateToProps)(ChestLoot);
