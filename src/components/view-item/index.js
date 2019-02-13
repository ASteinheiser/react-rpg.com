import React, { useState } from 'react';
import { connect }         from 'react-redux';

import Button        from '../button';
import ConfirmDialog from '../confirm-dialog';
import MicroDialog   from '../micro-dialog';
import { EmptySlot } from '../equipped-items';
import { uuidv4 }    from '../../modules/uuid-v4';

import StatsItem     from './stats-item';
import consumePotion from './consume-potion';
import buyItem       from './buy-item';
import dropItem      from './drop-item';
import equipItem     from './equip-item';
import unequipItem   from './unequip-item';
import sellItem      from './sell-item';

import './styles.scss';

const ViewItem = ({ sell, buy, onClose, data, stats, unequipItem, buyItem,
                    equipItem, dropItem, consumePotion, sellItem }) => {

  const [confirmPotion, setConfirmPotion] = useState(false);
  const [confirmDrop, setConfirmDrop] = useState(false);
  const [confirmSell, setConfirmSell] = useState(false);
  const [confirmBuy, setConfirmBuy] = useState(false);

  let itemStats = [];
  let itemIsEquipped = false;
  const equipped = stats.equippedItems;

  // find the type of item
  switch(data.type) {

    case 'upgrade::backpack':
      itemStats.push(<StatsItem stats={{ name: 'slots', value: data.slots }} key={uuidv4()} />);
      break;

    case 'potion':
      itemStats.push(<StatsItem stats={{ name: 'heal', value: Math.ceil((data.hp / stats.maxHp) * 100) }} key={uuidv4()} />);
      break;

    case 'weapon':
      itemIsEquipped = (JSON.stringify(equipped['weapon']) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'damage', value: data.damage }} key={uuidv4()} />);
      // if there's a bonus
      if(data.bonus) {
        let bonusType = data.bonus.split('::')[0];
        let bonusMult = parseFloat(data.bonus.split('::')[1], 10);
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
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['helmet']) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::body':
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['body']) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::gloves':
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['gloves']) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::boots':
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['boots']) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    case 'armor::pants':
      itemIsEquipped = (equipped['armor'] && JSON.stringify(equipped['armor']['pants']) === JSON.stringify(data));
      itemStats.push(<StatsItem stats={{ name: 'defence', value: data.defence }} key={uuidv4()} />);
      break;

    default:
  }

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
                        onClick={() => setConfirmPotion(true)}
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
            confirm={() => {
              dropItem(data);
              onClose();
            }}
            onClose={() => setConfirmDrop(false)} />
      }
      {
        confirmSell &&
          <ConfirmDialog
            text={`Are you sure you want to sell your ${data.name} for ${Math.ceil(data.value / 2)} gold ?`}
            cancelText={'Cancel'}
            acceptText={'Sell'}
            acceptIcon={'coins'}
            confirm={() => {
              sellItem(data);
              onClose();
            }}
            onClose={() => setConfirmSell(false)} />
      }
      {
        confirmBuy &&
          <ConfirmDialog
            text={`Are you sure you want to buy ${data.name} for ${data.value} gold ?`}
            cancelText={'Cancel'}
            acceptText={'Buy'}
            acceptIcon={'coins'}
            confirm={() => {
              buyItem(data);
              onClose();
            }}
            onClose={() => setConfirmBuy(false)} />
      }
      {
        confirmPotion &&
          <ConfirmDialog
            text={`Are you sure you want to use your ${data.name}?`}
            cancelText={'Cancel'}
            acceptText={'Heal'}
            acceptIcon={'medkit'}
            confirm={() => {
              consumePotion(data);
              onClose();
            }}
            onClose={() => setConfirmPotion(false)} />
      }
    </MicroDialog>
  );
}

const mapStateToProps = ({ stats }) => ({ stats });

const actions = { buyItem, consumePotion, dropItem, equipItem, unequipItem, sellItem };

export default connect(mapStateToProps, actions)(ViewItem);
