import React from 'react';
import { SPRITE_SIZE } from '../../config/constants';
import InventorySlot from './inventory-slot.png';

const EmptySlot = ({ margin, style, className, children }) => {

  const styles = {
    ...style,
    backgroundImage: `url('${InventorySlot}')`,
    width: `${SPRITE_SIZE}px`,
    height: `${SPRITE_SIZE}px`,
    margin
  };

  return (
    <div className={className || ''} style={styles}>
      { children }
    </div>
  );
};

export const DarkenSlot = () => {
  return (
    <div style={{
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      width: `${SPRITE_SIZE}px`,
      height: `${SPRITE_SIZE}px`
    }} />
  );
};

export default EmptySlot;
