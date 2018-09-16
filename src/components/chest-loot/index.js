import React, { Component } from 'react';

import Button      from '../button';
import MicroDialog from '../micro-dialog';
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

    // TODO: randomly give player equipment
    // do it!!

    this.state = {
      item: false,
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
    if(this.state.item) {
      // give them the item
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
          <div className='flex-row'>
            <span>{'Gold: '}</span>
            <span className='chest-loot-value-padding'>
              {gold}
            </span>
          </div>
          <div className='flex-row'>
            <span>{'Exp: '}</span>
            <span className='chest-loot-value-padding'>
              {exp}
            </span>
          </div>
        </div>
        {
          item ?
            <div>
              {'you got an item!'}
            </div>
            :
            null
        }
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
