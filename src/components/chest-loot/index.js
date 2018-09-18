import React, { Component } from 'react';

import Button      from '../button';
import MicroDialog from '../micro-dialog';
import randomItem  from './random-item';
import store       from '../../config/store';

import './styles.css';

class ChestLoot extends Component {
  constructor(props) {
    super(props);
    const { level } = store.getState().stats;

    // get a random amount of gold between 1 and 8 PLUS player level x2
    let gold = (Math.floor(Math.random() * 8) + 1) + (level * 2);
    store.dispatch({
      type: 'GET_GOLD',
      payload: { value: gold }
    })

    // get some level based exp
    let exp = (level * 5) + 5;
    store.dispatch({
      type: 'GET_EXP',
      payload: { value: exp }
    })

    let item = false;
    // give the player a 25% chance to get a random item
    let chance = Math.floor(Math.random() * 100) + 1;
    if(chance <= 25) {
      item = randomItem();
    }

    this.state = {
      item,
      gold,
      exp
    }
  }

  handleClose() {
    store.dispatch({
      type: 'PAUSE',
      payload: { component: false }
    })
  }

  handleContinue() {
    const { item } = this.state;

    if(item) {
      store.dispatch({
        type: 'GET_ITEM',
        payload: item
      })
    }
    this.handleClose();
  }

  render() {
    const { item, gold, exp } = this.state;

    return(
      <MicroDialog onClose={this.handleClose.bind(this)}>
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
                  backgroundSize: 'contain',
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
          <div className='flex-row chest-loot-button'>
            <Button
              onClick={this.handleContinue.bind(this)}
              title={item ? 'Pick Up' : 'Continue'}
              icon={item ? 'hand-paper-o' : 'check' }/>
          </div>
        </div>
      </MicroDialog>
    );
  }
}

export default ChestLoot;
