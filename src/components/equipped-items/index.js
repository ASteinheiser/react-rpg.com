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

export function EmptySlot({ margin, style, className, children }) {

  const styles = Object.assign({
    backgroundImage: `url('${InventorySlot}')`,
    width: '40px',
    height: '40px',
    margin: margin
  }, style);

  return (
    <div className={className || ''} style={styles}>
      { children }
    </div>
  );
}

function DarkenSlot() {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      width: 40,
      height: 40
    }} />
  );
}

const EquippedItems = ({ stats }) => {

  let { weapon, ring, armor } = stats.equippedItems;

  return (
    <div className='equipped-items__character'
      style={{backgroundImage: `url(${Character})`}}>

      <EmptySlot className='white-border equipped-items__helmet'>
        {
          armor && armor.helmet ?
            <button className='equipped-items__slot'
              onClick={handleUnequipItem.bind(this, armor.helmet)}
              style={{ backgroundImage: `url('${armor.helmet.image}')` }}>
              <DarkenSlot />
            </button>
            :
            <div className='equipped-items__slot--placeholder'
              style={{ backgroundImage: `url('${HelmetOutline}')` }} />
        }
      </EmptySlot>

      <EmptySlot className='white-border equipped-items__body'>
        {
          armor && armor.body ?
            <button className='equipped-items__slot'
              onClick={handleUnequipItem.bind(this, armor.body)}
              style={{ backgroundImage: `url('${armor.body.image}')` }}>
              <DarkenSlot />
            </button>
            :
            <div className='equipped-items__slot--placeholder'
              style={{ backgroundImage: `url('${BodyOutline}')` }} />
        }
      </EmptySlot>

      <div className='flex-row flex-end'>
        <EmptySlot className='equipped-items__gloves--left'>
          {
            armor && armor.gloves &&
              <div style={{
                height: 40,
                width: 40,
                backgroundImage: `url('${armor.gloves.image}')`
              }}>
              <DarkenSlot />
            </div>
          }
        </EmptySlot>
        <EmptySlot className='white-border equipped-items__pants'>
          {
            armor && armor.pants ?
              <button className='equipped-items__slot'
                onClick={handleUnequipItem.bind(this, armor.pants)}
                style={{ backgroundImage: `url('${armor.pants.image}')` }}>
                <DarkenSlot />
              </button>
              :
              <div className='equipped-items__slot--placeholder'
                style={{ backgroundImage: `url('${PantsOutline}')` }} />
          }
        </EmptySlot>
        <EmptySlot className='white-border equipped-items__gloves--right'>
          {
            armor && armor.gloves ?
              <button className='equipped-items__slot'
                onClick={handleUnequipItem.bind(this, armor.gloves)}
                style={{ backgroundImage: `url('${armor.gloves.image}')` }}>
                <DarkenSlot />
              </button>
              :
              <div className='equipped-items__slot--placeholder'
                style={{ backgroundImage: `url('${GlovesOutline}')` }} />
          }
        </EmptySlot>
      </div>

      <div className='flex-row space-between'>
        <EmptySlot className='white-border equipped-items__ring'>
          {
            ring ?
              <button className='equipped-items__slot'
                onClick={handleUnequipItem.bind(this, ring)}
                style={{ backgroundImage: `url('${ring.image}')` }}>
                <DarkenSlot />
              </button>
              :
              <div className='equipped-items__slot--placeholder'
                style={{ backgroundImage: `url('${RingOutline}')` }} />
          }
        </EmptySlot>

        <EmptySlot className='white-border equipped-items__weapon'>
          {
            weapon ?
              <button className='equipped-items__slot'
                onClick={handleUnequipItem.bind(this, weapon)}
                style={{ backgroundImage: `url('${weapon.image}')` }}>
                <DarkenSlot />
              </button>
              :
              <div className='equipped-items__slot--placeholder'
                style={{ backgroundImage: `url('${SwordOutline}')` }} />
          }
        </EmptySlot>
      </div>

      <div className='flex-row space-between'>
        <EmptySlot className='equipped-items__boots--left'>
          {
            armor && armor.boots &&
              <div style={{
                height: 40,
                width: 40,
                backgroundImage: `url('${armor.boots.image}')`
              }}>
              <DarkenSlot />
            </div>
          }
        </EmptySlot>
        <EmptySlot className='white-border equipped-items__boots--right'>
          {
            armor && armor.boots ?
              <button className='equipped-items__slot'
                onClick={handleUnequipItem.bind(this, armor.boots)}
                style={{ backgroundImage: `url('${armor.boots.image}')` }}>
                <DarkenSlot />
              </button>
              :
              <div className='equipped-items__slot--placeholder'
                style={{ backgroundImage: `url('${BootsOutline}')` }} />
          }
        </EmptySlot>
      </div>

    </div>
  );
}

const mapStateToProps = ({ stats }) => ({ stats });

export default connect(mapStateToProps)(EquippedItems);
