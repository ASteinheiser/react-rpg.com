import React       from 'react';
import { connect } from 'react-redux';

import InventorySlot from './inventory-slot.png';
import store         from '../../config/store';

import './styles.css';

function handleUnequipItem(item) {
  store.dispatch({
    type: 'UNEQUIP_ITEM',
    payload: { data: item }
  })
}

function EquippedItems(props) {
  let { weapon, ring, armor } = props.stats.equippedItems;

  return (
    <div className='equipped-items-container'>
      <div className='white-border'>
        <div className='flex-row'>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            {
              weapon ?
                <div onClick={handleUnequipItem.bind(this, weapon)}
                  style={{
                    cursor: 'pointer',
                    backgroundImage: `url('${weapon.image}')`,
                    backgroundSize: 'contain',
                    width: '40px',
                    height: '40px'
                  }} />
                :
                null
            }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            {
              armor && armor.helmet ?
                <div onClick={handleUnequipItem.bind(this, armor.helmet)}
                  style={{
                    cursor: 'pointer',
                    backgroundImage: `url('${armor.helmet.image}')`,
                    backgroundSize: 'contain',
                    width: '40px',
                    height: '40px'
                  }} />
                :
                null
            }
          </div>
        </div>

        <div className='flex-row'>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            {
              ring ?
                <div onClick={handleUnequipItem.bind(this, ring)}
                  style={{
                    cursor: 'pointer',
                    backgroundImage: `url('${ring.image}')`,
                    backgroundSize: 'contain',
                    width: '40px',
                    height: '40px'
                  }} />
                :
                null
            }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            {
              armor && armor.body ?
                <div onClick={handleUnequipItem.bind(this, armor.body)}
                  style={{
                    cursor: 'pointer',
                    backgroundImage: `url('${armor.body.image}')`,
                    backgroundSize: 'contain',
                    width: '40px',
                    height: '40px'
                  }} />
                :
                null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ stats }) => {
  return { stats };
}

export default connect(mapStateToProps)(EquippedItems);
