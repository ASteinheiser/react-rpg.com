import React       from 'react';
import { connect } from 'react-redux';

import { EmptySlot } from '../equipped-items';

import './styles.scss';

const BackpackItems = ({ view_item, inventory }) => {

  const { items, maxItems } = inventory;

  const itemSlots = new Array(maxItems).fill(null);
  // for each empty slot
  itemSlots.forEach((item, index) => {
    // see if there are more items to render from the inventory
    if(items.length > index) {
      // assign the slot to that item
      itemSlots[index] = (
        <button
          onClick={() => view_item(items[index])}
          style={{
            backgroundImage: `url('${items[index].image}')`,
            backgroundColor: 'var(--transparent)',
            width: '40px',
            height: '40px',
            padding: 0,
            border: 'none',
            cursor: 'pointer'
          }} />
      );
    }
  });

  return (
    <div className='flex-column white-border backpack-items__container'
      style={{ minHeight: maxItems === 12 ? 120 : 80 }}>
      <div className='flex-row'>
        <EmptySlot>
          { itemSlots[0] }
        </EmptySlot>
        <EmptySlot>
          { itemSlots[1] }
        </EmptySlot>
        <EmptySlot>
          { itemSlots[2] }
        </EmptySlot>
        <EmptySlot>
          { itemSlots[3] }
        </EmptySlot>
      </div>

      <div className='flex-row'>
        <EmptySlot>
          { itemSlots[4] }
        </EmptySlot>
        <EmptySlot>
          { itemSlots[5] }
        </EmptySlot>
        <EmptySlot>
          { itemSlots[6] }
        </EmptySlot>
        <EmptySlot>
          { itemSlots[7] }
        </EmptySlot>
      </div>

      {
        maxItems === 12 ?
          <div className='flex-row'>
            <EmptySlot>
              { itemSlots[8] }
            </EmptySlot>
            <EmptySlot>
              { itemSlots[9] }
            </EmptySlot>
            <EmptySlot>
              { itemSlots[10] }
            </EmptySlot>
            <EmptySlot>
              { itemSlots[11] }
            </EmptySlot>
          </div>
          :
          null
      }
    </div>
  );
}

const mapStateToProps = ({ inventory }) => ({ inventory });

export default connect(mapStateToProps)(BackpackItems);
