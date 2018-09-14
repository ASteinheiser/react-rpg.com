import React       from 'react';
import { connect } from 'react-redux';

import InventorySlot from '../equipped-items/inventory-slot.png';

import './styles.css';

function CurrentItems(props) {
  let { items } = props.inventory;

  const itemSlots = new Array(9).fill(null);

  itemSlots.forEach((item, index) => {
    if(items.length > index) {
      itemSlots[index] = (
        <div style={{
          backgroundImage: `url('${items[0].image}')`,
          backgroundSize: 'contain',
          width: '40px',
          height: '40px' }} />
      );
    }
  });

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
            { itemSlots[0] }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[1] }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[2] }
          </div>
        </div>

        <div className='flex-row'>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[3] }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[4] }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[5] }
          </div>
        </div>

        <div className='flex-row'>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[6] }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[7] }
          </div>
          <div style={{
              backgroundImage: `url('${InventorySlot}')`,
              backgroundSize: 'contain',
              width: '40px',
              height: '40px'
            }}>
            { itemSlots[8] }
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ inventory }) => {
  return { inventory };
}

export default connect(mapStateToProps)(CurrentItems);
