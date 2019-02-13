import React, { useState } from 'react';
import { connect }         from 'react-redux';

import Button        from '../button';
import ConfirmDialog from '../confirm-dialog';
import { EmptySlot } from '../equipped-items';
import MicroDialog   from '../micro-dialog';
import { uuidv4 }    from '../../modules/uuid-v4';

import equipItem     from './equip-item';
import unequipItem   from './unequip-item';
import StatsItem     from './stats-item';

import store from '../../config/store';

import './styles.scss';

const ViewItem = ({ sell, buy, onClose, data, stats, inventory, unequipItem,
                    equipItem }) => {

  const [confirmHeal, setConfirmHeal] = useState(false);
  const [confirmDrop, setConfirmDrop] = useState(false);
  const [confirmSell, setConfirmSell] = useState(false);
  const [confirmBuy, setConfirmBuy] = useState(false);

  function handleConfirmDrop(item) {
    onClose();
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
  }

  function handleConfirmHeal(item) {
    onClose();
    store.dispatch({
      type: 'DROP_ITEM',
      payload: item
    });
    store.dispatch({
      type: 'HEAL_HP',
      payload: { value: parseInt(item.hp, 10) }
    });
  }

  function handleConfirmBuy(item) {
    const { gold } = stats;
    const { items, maxItems } = inventory;
    // make sure player has enough gold
    if(gold >= item.value) {
      // if it's a backpack upgrade
      if(item.type === 'upgrade::backpack') {
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

  const equipped = stats.equippedItems;

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
      itemIsEquipped = (JSON.stringify(equipped['weapon']) === JSON.stringify(data));
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'damage', value: data.damage }} key={uuidv4()} />);
      // if there's a bonus
      if(data.bonus) {
        let bonusType = data.bonus.split('::')[0];
        let bonusMult = parseFloat(data.bonus.split('::')[1], 10);
        // display the bonus
        itemStats.push(<StatsItem stats={{ name: `VS. ${bonusType}`, value: bonusMult + 'x' }} key={uuidv4()} />);
      }
      break;

    case 'ring':
      itemIsEquipped = (JSON.stringify(equipped['ring']) === JSON.stringify(data));
      // find each effect
      Object.keys(data.effect).forEach((name) => {
        itemStats.push(<StatsItem stats={{ name, value: data.effect[name] }} key={uuidv4()} />);
      });
      break;

    case 'armor::helmet':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['helmet']) === JSON.stringify(data));
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::body':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['body']) === JSON.stringify(data));
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::gloves':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['gloves']) === JSON.stringify(data));
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::boots':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['boots']) === JSON.stringify(data));
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::pants':
      // properly check the armor
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['pants']) === JSON.stringify(data));
      // display stats
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    default:
  }

  const itemSellPrice = Math.ceil(data.value / 2);

  return(
    <MicroDialog onClose={onClose}>

      <div className='view-item__title'>
        <EmptySlot className='white-border view-item__image'>
          <div style={{
              backgroundImage: `url('${data.image}')`,
              width: '40px',
              height: '40px'
            }} />
        </EmptySlot>

        <span className='view-item__text'>
          { data.name || '-' }
        </span>
      </div>

      <div className='flex-column view-item__stats'>
        { itemStats }
      </div>

      {
        (sell || buy) ?
            buy ?
            <div className='flex-column view-item__button-container'>
              <div className='flex-row view-item__button'>
                <Button
                  onClick={() => setConfirmBuy(true)}
                  icon='coins'
                  title={'Buy Item'} />
              </div>
            </div>
            :
            <div className='flex-column view-item__button-container'>
              <div className='flex-row view-item__button'>
                <Button
                  onClick={() => setConfirmSell(true)}
                  icon='coins'
                  title={'Sell Item'} />
              </div>
            </div>
          :
          <div className='flex-column view-item__button-container'>
            {
              itemIsEquipped ?
                <div className='flex-row view-item__button'>
                  <Button
                    onClick={() => {
                      unequipItem(data);
                      onClose();
                    }}
                    icon='archive'
                    title={'Un-equip'} />
                </div>
                :
                <div className='flex-row view-item__button'>
                  <Button
                    onClick={() => setConfirmDrop(true)}
                    icon='trash'
                    title={'Drop'} />
                  {
                    data.type === 'potion' ?
                      <Button
                        onClick={() => setConfirmHeal(true)}
                        icon='medkit'
                        title={'Heal'} />
                      :
                      <Button
                        onClick={() => {
                          equipItem(data);
                          onClose();
                        }}
                        icon='hand-paper'
                        title={'Equip'} />
                  }
                </div>
            }
          </div>
      }
      {
        confirmDrop &&
          <ConfirmDialog
            text={'Are you sure!? This item will be gone forever...'}
            cancelText={'Keep'}
            cancelIcon={'archive'}
            acceptText={'Drop'}
            acceptIcon={'trash'}
            confirm={() => handleConfirmDrop(data)}
            onClose={() => setConfirmDrop(false)} />
      }
      {
        confirmSell &&
          <ConfirmDialog
            text={`Are you sure you want to sell your ${data.name} for ${itemSellPrice} gold ?`}
            cancelText={'Cancel'}
            acceptText={'Sell'}
            acceptIcon={'coins'}
            confirm={() => handleConfirmSell(data, itemSellPrice)}
            onClose={() => setConfirmSell(false)} />
      }
      {
        confirmBuy &&
          <ConfirmDialog
            text={`Are you sure you want to buy ${data.name} for ${data.value} gold ?`}
            cancelText={'Cancel'}
            acceptText={'Buy'}
            acceptIcon={'coins'}
            confirm={() => handleConfirmBuy(data)}
            onClose={() => setConfirmBuy(false)} />
      }
      {
        confirmHeal &&
          <ConfirmDialog
            text={`Are you sure you want to use your ${data.name}?`}
            cancelText={'Cancel'}
            acceptText={'Heal'}
            acceptIcon={'medkit'}
            confirm={() => handleConfirmHeal(data)}
            onClose={() => setConfirmHeal(false)} />
      }
    </MicroDialog>
  );
}

const mapStateToProps = ({ inventory, stats }) => ({ inventory, stats });

const actions = { unequipItem, equipItem };

export default connect(mapStateToProps, actions)(ViewItem);
