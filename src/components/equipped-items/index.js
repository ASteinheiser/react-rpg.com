import React       from 'react';
import { connect } from 'react-redux';

import Character     from './equipment-character.png';
import InventorySlot from './inventory-slot.png';
import store         from '../../config/store';

import './styles.css';

function handleUnequipItem(item) {
  store.dispatch({
    type: 'UNEQUIP_ITEM',
    payload: { data: item }
  })
}

export function EmptySlot(props) {
  return (
    <div className='white-border' style={{
        backgroundImage: `url('${InventorySlot}')`,
        backgroundSize: 'contain',
        width: '40px',
        height: '40px',
        margin: props.margin
      }}>
      { props.children }
    </div>
  );
}

function DarkenSlot(props) {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      width: 40,
      height: 40
    }} />
  );
}

function EquippedItems(props) {
  let { weapon, ring, armor } = props.stats.equippedItems;

  return (
    <div className='equipped-items-character'
      style={{backgroundImage: `url(${Character})`}}>

      <EmptySlot margin={'25px auto 0 auto'}>
        {
          armor && armor.helmet ?
            <div className='item-slot'
              onClick={handleUnequipItem.bind(this, armor.helmet)}
              style={{ backgroundImage: `url('${armor.helmet.image}')` }}>
              <DarkenSlot />
            </div>
            :
            null
        }
      </EmptySlot>

      <EmptySlot margin={'50px auto 0 auto'}>
        {
          armor && armor.body ?
            <div className='item-slot'
              onClick={handleUnequipItem.bind(this, armor.body)}
              style={{ backgroundImage: `url('${armor.body.image}')` }}>
              <DarkenSlot />
            </div>
            :
            null
        }
      </EmptySlot>

      <div className='flex-row space-between'>
        <EmptySlot margin={'30px 15px 0 15px'}>
          {
            armor && armor.gloves ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.gloves)}
                style={{ backgroundImage: `url('${armor.gloves.image}')` }}>
                <DarkenSlot />
              </div>
              :
              null
          }
        </EmptySlot>
        <EmptySlot margin={'30px 15px 0 15px'}>
          {
            armor && armor.gloves ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.gloves)}
                style={{ backgroundImage: `url('${armor.gloves.image}')` }}>
                <DarkenSlot />
              </div>
              :
              null
          }
        </EmptySlot>
      </div>

      <div className='flex-row space-between'>
        <EmptySlot margin={'25px 0 0 0'}>
          {
            ring ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, ring)}
                style={{ backgroundImage: `url('${ring.image}')` }}>
                <DarkenSlot />
              </div>
              :
              null
          }
        </EmptySlot>

        <EmptySlot margin={'25px 0 0 0'}>
          {
            weapon ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, weapon)}
                style={{ backgroundImage: `url('${weapon.image}')` }}>
                <DarkenSlot />
              </div>
              :
              null
          }
        </EmptySlot>
      </div>

      <div className='flex-row space-between'>
        <EmptySlot margin={'60px 29px 0 29px'}>
          {
            armor && armor.boots ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.boots)}
                style={{ backgroundImage: `url('${armor.boots.image}')` }}>
                <DarkenSlot />
              </div>
              :
              null
          }
        </EmptySlot>
        <EmptySlot margin={'60px 29px 0 29px'}>
          {
            armor && armor.boots ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.boots)}
                style={{ backgroundImage: `url('${armor.boots.image}')` }}>
                <DarkenSlot />
              </div>
              :
              null
          }
        </EmptySlot>
      </div>

    </div>
  );
}

const mapStateToProps = ({ stats }) => {
  return { stats };
}

export default connect(mapStateToProps)(EquippedItems);
