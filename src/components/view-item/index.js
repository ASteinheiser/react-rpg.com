import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button        from '../button';
import { EmptySlot } from '../equipped-items';
import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import StatsItem     from './stats-item';
import store         from '../../config/store';
import { uuidv4 }    from '../../modules/uuid-v4';

import './styles.scss';

const ViewItem = (props) => {

  const { sell, buy, onClose } = props;

  const [confirmDrop, setConfirmDrop] = useState(false);
  const [confirmSell, setConfirmSell] = useState(false);
  const [confirmBuy, setConfirmBuy] = useState(false);

  function handleUnEquip(item) {
    props.onClose();
    store.dispatch({
      type: 'UNEQUIP_ITEM',
      payload: {
        data: item
      }
    });
  }

  function handleEquip(item) {
    props.onClose();
    store.dispatch({
      type: 'EQUIP_ITEM',
      payload: item
    });
  }

  function handleDrop() {
    setConfirmDrop(true);
  }

  function handleCancelDrop() {
    setConfirmDrop(false);
  }

  function handleConfirmDrop(item) {
    props.onClose();
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  }

  function handleConfirmBuy(item) {
    const { gold } = props.stats;
    const { items, maxItems } = props.inventory;
    // make sure player has enough gold
    if(gold >= item.value) {
      // if it's an hp potion
      if(item.type === 'potion') {
        store.dispatch({
          type: 'LOSE_GOLD',
          payload: { value: item.value }
        });
        store.dispatch({
          type: 'HEAL_HP',
          payload: { value: parseInt(item.hp, 10) }
        });
      } // if it's a backpack upgrade
      else if(item.type === 'upgrade::backpack') {
        store.dispatch({
          type: 'LOSE_GOLD',
          payload: { value: item.value }
        });
        store.dispatch({
          type: 'UPGRADE_PACK',
          payload: { slots: item.slots }
        });
      } // otherwise, see if there's room in the inventory
      else if(items.length < maxItems) {
        store.dispatch({
          type: 'LOSE_GOLD',
          payload: { value: item.value }
        });
        store.dispatch({
          type: 'GET_ITEM',
          payload: item
        });
      } else {
        // inventory full
        store.dispatch({
          type: 'TOO_MANY_ITEMS',
          payload: item
        });
      }
    } else {
      // not enough gold!
      store.dispatch({
        type: 'NOT_ENOUGH_GOLD',
        payload: item
      });
    }

    onClose();
  }

  function handleConfirmSell(item, sellPrice) {
    store.dispatch({
      type: 'GET_GOLD',
      payload: { value: sellPrice }
    });
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    });

    const { equippedItems } = store.getState().stats;
    let itemEquipped = false;
    // check if the item was equipped, then take it off
    switch(item.type) {
      case 'weapon':
        if(JSON.stringify(equippedItems['weapon']) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'ring':
        if(JSON.stringify(equippedItems['ring']) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::body':
        if(equippedItems['armor'] && JSON.stringify(equippedItems['armor']['body']) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::pants':
        if(equippedItems['armor'] && JSON.stringify(equippedItems['armor']['pants']) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::helmet':
        if(equippedItems['armor'] && JSON.stringify(equippedItems['armor']['helmet']) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::boots':
        if(equippedItems['armor'] && JSON.stringify(equippedItems['armor']['boots']) === JSON.stringify(item)) itemEquipped = true;
        break;
      case 'armor::gloves':
        if(equippedItems['armor'] && JSON.stringify(equippedItems['armor']['gloves']) === JSON.stringify(item)) itemEquipped = true;
        break;
      default:
    }

    if(itemEquipped) {
      store.dispatch({
        type: 'UNEQUIP_ITEM',
        payload: { data: item }
      });
    }

    onClose();
  }

  const { data, stats } = props;
  // get equipped items
  const equipped = store.getState().stats.equippedItems;

  // array of item stats
  let itemStats = [];

  let itemIsEquipped = false;
  // find the type of item
  switch(data.type) {

    case 'upgrade::backpack':
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'slots', value: data.slots }} key={uuidv4()} />);
      break;

    case 'potion':
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'heal', value: Math.ceil((data.hp / stats.maxHp) * 100) }} key={uuidv4()} />);
      break;

    case 'weapon':
      itemIsEquipped = (equipped['weapon'] === data);
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'damage', value: data.damage }} key={uuidv4()} />);
      // if there's a bonus
      if(data.bonus) {
        let bonusType = data.bonus.split('::')[0];
        let bonusMult = parseFloat(data.bonus.split('::')[1], 10);
        // display the bonus
        itemStats.push(<StatsItem stats={{ name: 'VS. ' + bonusType, value: bonusMult + 'x' }} key={uuidv4()} />);
      }
      break;

    case 'ring':
      itemIsEquipped = (equipped['ring'] === data);
      // find each effect
      Object.keys(data.effect).forEach((name) => {
        itemStats.push(<StatsItem stats={{ name, value: data.effect[name] }} key={uuidv4()} />);
      });
      break;

    case 'armor::helmet':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && equipped['armor']['helmet'] === data);
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::body':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && equipped['armor']['body'] === data);
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::gloves':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && equipped['armor']['gloves'] === data);
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::boots':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && equipped['armor']['boots'] === data);
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::pants':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && equipped['armor']['pants'] === data);
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    default:
  }

  const itemSellPrice = Math.ceil(data.value / 2);

  return(
    <MicroDialog onClose={props.onClose}>
      <div className='view-item-text-container'>
        <EmptySlot className='white-border view-item-image-container'>
          <div style={{
              backgroundImage: `url('${data.image}')`,
              width: '40px',
              height: '40px'
            }} />
        </EmptySlot>
        <span className='view-item-text'>
          { data.name || '-' }
        </span>
      </div>

      <div className='flex-column view-item-stats-container'>
        { itemStats }
      </div>

      {
        sell || buy ?
            buy ?
            <div className='flex-column view-item-buttons-parent'>
              <div className='flex-row view-item-buttons-child'>
                <Button
                  onClick={() => setConfirmBuy(true)}
                  icon='coins'
                  title={'Buy Item'} />
              </div>
            </div>
            :
            <div className='flex-column view-item-buttons-parent'>
              <div className='flex-row view-item-buttons-child'>
                <Button
                  onClick={() => setConfirmSell(true)}
                  icon='coins'
                  title={'Sell Item'} />
              </div>
            </div>
          :
          <div className='flex-column view-item-buttons-parent'>
            {
              itemIsEquipped ?
                <div className='flex-row view-item-buttons-child'>
                  <Button
                    onClick={() => handleUnEquip(data)}
                    icon='archive'
                    title={'Un-equip'} />
                </div>
                :
                <div className='flex-row view-item-buttons-child'>
                  <Button
                    onClick={handleDrop}
                    icon='trash'
                    title={'Drop'} />
                  <Button
                    onClick={() => handleEquip(data)}
                    icon='hand-paper'
                    title={'Equip'} />
                </div>
            }
          </div>
      }
      {
        confirmDrop ?
          <ConfirmDialog
            text={'Are you sure!? This item will be gone forever...'}
            cancelText={'Keep'}
            cancelIcon={'archive'}
            acceptText={'Drop'}
            acceptIcon={'trash'}
            confirm={() => handleConfirmDrop(data)}
            onClose={handleCancelDrop} />
          :
          null
      }
      {
        confirmSell ?
          <ConfirmDialog
            text={'Are you sure you want to sell your ' + data.name + ' for ' + itemSellPrice + ' gold ?'}
            cancelText={'Cancel'}
            acceptText={'Sell'}
            acceptIcon={'coins'}
            confirm={() => handleConfirmSell(data, itemSellPrice)}
            onClose={() => setConfirmSell(false)} />
          :
          null
      }
      {
        confirmBuy ?
          <ConfirmDialog
            text={'Are you sure you want to buy ' + data.name + ' for ' + data.value + ' gold ?'}
            cancelText={'Cancel'}
            acceptText={'Buy'}
            acceptIcon={'coins'}
            confirm={() => handleConfirmBuy(data)}
            onClose={() => setConfirmBuy(false)} />
          :
          null
      }
    </MicroDialog>
  );
}

const mapStateToProps = ({ inventory, stats }) => ({ inventory, stats });

export default connect(mapStateToProps)(ViewItem);
