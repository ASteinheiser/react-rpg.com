import React from 'react';
import { connect } from 'react-redux';
import EmptySlot from '../empty-slot';
import { MAX_ITEMS_UPGRADE, SPRITE_SIZE } from '../../config/constants';
import './styles.scss';

const initialHeight = SPRITE_SIZE * 2;
const upgradedHeight = SPRITE_SIZE * 3;

const BackpackItems = ({ viewItem, inventory }) => {

  const { items, maxItems } = inventory;

  const itemSlots = new Array(maxItems).fill(null);

  for(let i = 0; i < items.length; i ++) {
    itemSlots[i] = (
      <button
        onClick={() => viewItem(items[i])}
        style={{
          backgroundImage: `url('${items[i].image}')`,
          width: `${SPRITE_SIZE}px`,
          height: `${SPRITE_SIZE}px`,
          cursor: 'pointer'
        }} />
    );
  }

  return (
    <div className='flex-column white-border backpack-items__container'
      style={{ minHeight: maxItems === MAX_ITEMS_UPGRADE ? upgradedHeight: initialHeight }}>

      <div className='flex-row'>
        <EmptySlot>{ itemSlots[0] }</EmptySlot>
        <EmptySlot>{ itemSlots[1] }</EmptySlot>
        <EmptySlot>{ itemSlots[2] }</EmptySlot>
        <EmptySlot>{ itemSlots[3] }</EmptySlot>
      </div>

      <div className='flex-row'>
        <EmptySlot>{ itemSlots[4] }</EmptySlot>
        <EmptySlot>{ itemSlots[5] }</EmptySlot>
        <EmptySlot>{ itemSlots[6] }</EmptySlot>
        <EmptySlot>{ itemSlots[7] }</EmptySlot>
      </div>

      {
        maxItems === MAX_ITEMS_UPGRADE &&
          <div className='flex-row'>
            <EmptySlot>{ itemSlots[8] }</EmptySlot>
            <EmptySlot>{ itemSlots[9] }</EmptySlot>
            <EmptySlot>{ itemSlots[10] }</EmptySlot>
            <EmptySlot>{ itemSlots[11] }</EmptySlot>
          </div>
      }
    </div>
  );
};

const mapStateToProps = ({ inventory }) => ({ inventory });

export default connect(mapStateToProps)(BackpackItems);
