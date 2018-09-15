import React, { Component } from 'react';

import Button        from '../button';
import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import StatsItem     from './stats-item';
import store         from '../../config/store';

import './styles.css';

class ViewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmDrop: false
    };
  }

  handleUnEquip(item) {
    this.props.onClose();
    store.dispatch({
      type: 'UNEQUIP_ITEM',
      payload: {
        data: item
      }
    });
  }

  handleEquip(item) {
    this.props.onClose();
    store.dispatch({
      type: 'EQUIP_ITEM',
      payload: item
    });
  }

  handleDrop(item) {
    this.setState({ confirmDrop: true });
  }

  handleCancelDrop() {
    this.setState({ confirmDrop: false });
  }

  handleConfirmDrop(item) {
    this.props.onClose();
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  }

  render() {
    const { data } = this.props;
    const { confirmDrop } = this.state;
    // get equipped items
    const equipped = store.getState().stats.equippedItems;

    // array of item stats
    let itemStats = [];

    let itemIsEquipped = false;
    // find the type and see if this item is equipped
    switch(data.type) {

      case 'weapon':
        itemIsEquipped = (equipped['weapon'] === data);
        // display stats
        itemStats.push(<StatsItem stats={{ name: 'damage', value: data.damage }} />);
        break;

      case 'ring':
        itemIsEquipped = (equipped['ring'] === data);
        // find each effect
        Object.keys(data.effect).forEach((name) => {
          itemStats.push(<StatsItem stats={{ name, value: data.effect[name] }} />);
        });
        break;

      case 'armor::helmet':
        // properly check the armor
        itemIsEquipped = (equipped['armor'] && equipped['armor']['helmet'] === data);
        // display stats
        itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} />);
        break;

      case 'armor::body':
        // properly check the armor
        itemIsEquipped = (equipped['armor'] && equipped['armor']['body'] === data);
        // display stats
        itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} />);
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

        <div className='view-item-stats-container'>
          { itemStats }
        </div>

        <div className='flex-column view-item-buttons-parent'>
          {
            itemIsEquipped ?
              <div className='flex-row view-item-buttons-child'>
                <Button
                  onClick={this.handleUnEquip.bind(this, data)}
                  icon='archive'
                  title={'Un-equip'} />
              </div>
              :
              <div className='flex-row view-item-buttons-child'>
                <Button
                  onClick={this.handleDrop.bind(this)}
                  icon='trash-o'
                  title={'Drop'} />
                <Button
                  onClick={this.handleEquip.bind(this, data)}
                  icon='child'
                  title={'Equip'} />
              </div>
          }
        </div>
        {
          confirmDrop ?
            <ConfirmDialog
              text={'Are you sure!? This item will be gone forever...'}
              cancelText={'Keep'}
              cancelIcon={'archive'}
              acceptText={'Drop'}
              acceptIcon={'trash-o'}
              confirm={this.handleConfirmDrop.bind(this, data)}
              onClose={this.handleCancelDrop.bind(this)} />
            :
            null
        }
      </MicroDialog>
    );
  }
}

export default ViewItem;
