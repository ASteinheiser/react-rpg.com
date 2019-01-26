import React       from 'react';
import { connect } from 'react-redux';

import BootsOutline  from './assets/boots-outline.png';
import HelmetOutline from './assets/helmet-outline.png';
import BodyOutline   from './assets/body-outline.png';
import GlovesOutline from './assets/gloves-outline.png';
import PantsOutline  from './assets/pants-outline.png'
import RingOutline   from './assets/ring-outline.png';
import SwordOutline  from './assets/sword-outline.png';
import Character     from './assets/equipment-character.png';
import InventorySlot from './assets/inventory-slot.png';
import store         from '../../config/store';

import './styles.scss';

function handleUnequipItem(item) {
  store.dispatch({
    type: 'UNEQUIP_ITEM',
    payload: { data: item }
  })
}

export function EmptySlot(props) {
  return (
    <div className={props.className ? props.className : ''} style={
      Object.assign({}, {
        backgroundImage: `url('${InventorySlot}')`,
        width: '40px',
        height: '40px',
        margin: props.margin
      }, props.style)
    }>
      { props.children }
    </div>
  );
}

function DarkenSlot(props) {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
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

      <EmptySlot className='white-border' margin={'20px 0 0 66px'}>
        {
          armor && armor.helmet ?
            <div className='item-slot'
              onClick={handleUnequipItem.bind(this, armor.helmet)}
              style={{ backgroundImage: `url('${armor.helmet.image}')` }}>
              <DarkenSlot />
            </div>
            :
            <div className='item-slot-placeholder'
              style={{ backgroundImage: `url('${HelmetOutline}')` }} />
        }
      </EmptySlot>

      <EmptySlot className='white-border' margin={'12px 0 0 66px'}>
        {
          armor && armor.body ?
            <div className='item-slot'
              onClick={handleUnequipItem.bind(this, armor.body)}
              style={{ backgroundImage: `url('${armor.body.image}')` }}>
              <DarkenSlot />
            </div>
            :
            <div className='item-slot-placeholder'
              style={{ backgroundImage: `url('${BodyOutline}')` }} />
        }
      </EmptySlot>

      <div className='flex-row flex-end'>
        <EmptySlot className='white-border' margin={'30px 0 0 18px'}>
          {
            armor && armor.gloves ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.gloves)}
                style={{ backgroundImage: `url('${armor.gloves.image}')` }}>
                <DarkenSlot />
              </div>
              :
              <div className='item-slot-placeholder'
                style={{ backgroundImage: `url('${GlovesOutline}')` }} />
          }
        </EmptySlot>
        <EmptySlot className='white-border' margin={'16px 6px 0'}>
          {
            armor && armor.pants ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.pants)}
                style={{ backgroundImage: `url('${armor.pants.image}')` }}>
                <DarkenSlot />
              </div>
              :
              <div className='item-slot-placeholder'
                style={{ backgroundImage: `url('${PantsOutline}')` }} />
          }
        </EmptySlot>
        <EmptySlot className='white-border' margin={'30px 0 0 0'}>
          {
            armor && armor.gloves ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.gloves)}
                style={{ backgroundImage: `url('${armor.gloves.image}')` }}>
                <DarkenSlot />
              </div>
              :
              <div className='item-slot-placeholder'
                style={{ backgroundImage: `url('${GlovesOutline}')` }} />
          }
        </EmptySlot>
      </div>

      <div className='flex-row space-between'>
        <EmptySlot className='white-border' margin={'25px 0 0 30px'}>
          {
            ring ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, ring)}
                style={{ backgroundImage: `url('${ring.image}')` }}>
                <DarkenSlot />
              </div>
              :
              <div className='item-slot-placeholder'
                style={{ backgroundImage: `url('${RingOutline}')` }} />
          }
        </EmptySlot>

        <EmptySlot className='white-border' margin={'25px 26px 0 0'}>
          {
            weapon ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, weapon)}
                style={{ backgroundImage: `url('${weapon.image}')` }}>
                <DarkenSlot />
              </div>
              :
              <div className='item-slot-placeholder'
                style={{ backgroundImage: `url('${SwordOutline}')` }} />
          }
        </EmptySlot>
      </div>

      <div className='flex-row space-between'>
        <EmptySlot className='white-border' margin={'30px 0 0 20px'}>
          {
            armor && armor.boots ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.boots)}
                style={{ backgroundImage: `url('${armor.boots.image}')` }}>
                <DarkenSlot />
              </div>
              :
              <div className='item-slot-placeholder'
                style={{ backgroundImage: `url('${BootsOutline}')` }} />
          }
        </EmptySlot>
        <EmptySlot className='white-border' margin={'30px 16px 0 0'}>
          {
            armor && armor.boots ?
              <div className='item-slot'
                onClick={handleUnequipItem.bind(this, armor.boots)}
                style={{ backgroundImage: `url('${armor.boots.image}')` }}>
                <DarkenSlot />
              </div>
              :
              <div className='item-slot-placeholder'
                style={{ backgroundImage: `url('${BootsOutline}')` }} />
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
