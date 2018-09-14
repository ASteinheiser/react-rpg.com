import React, { Component } from 'react';

import Button      from '../button';
import MicroDialog from '../micro-dialog';
import store       from '../../config/store';

import './styles.css';

class ViewItem extends Component {

  handleUnEquip(itemSlot) {
    store.dispatch({
      type: 'UNEQUIP_ITEM',
      payload: {
        data: {
          type: itemSlot
        }
      }
    });
  }

  handleEquip(item) {
    store.dispatch({
      type: 'EQUIP_ITEM',
      payload: item
    });
  }

  handleDrop(item) {
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  }

  render() {
    const { data } = this.props;
    // get equipped items
    const equipped = store.getState().stats.equippedItems;

    let itemIsEquipped = false;
    // find the type and see if this item is equipped
    switch(data.type) {

      case 'weapon':
        itemIsEquipped = (equipped['weapon'] === data);
        break;

      case 'ring':
        itemIsEquipped = (equipped['ring'] === data);
        break;

      case 'armor::helmet':
        itemIsEquipped = (equipped['armor::helmet'] === data);
        break;

      case 'armor::body':
        itemIsEquipped = (equipped['armor::body'] === data);
        break;

      default:
    }

    return(
      <MicroDialog onClose={this.props.onClose}>
        <div className='view-item-text-container'>
          <div style={{
              backgroundImage: `url('${data.image}')`,
              backgroundSize: 'contain',
              width: '60px',
              height: '60px'
            }} />
          <span className='view-item-text'>
            { data.name || '-' }
          </span>
        </div>

        <div className='flex-column view-item-buttons-parent'>
          {
            itemIsEquipped ?
              <div className='flex-row view-item-buttons-child'>
                <Button
                  onClick={this.handleUnEquip.bind(this, data.type)}
                  icon='archive'
                  title={'Un-equip'} />
              </div>
              :
              <div className='flex-row view-item-buttons-child'>
                <Button
                  onClick={this.handleDrop.bind(this, data)}
                  icon='trash-o'
                  title={'Drop'} />
                <Button
                  onClick={this.handleEquip.bind(this, data)}
                  icon='child'
                  title={'Equip'} />
              </div>
          }
        </div>
      </MicroDialog>
    );
  }
}

export default ViewItem;
