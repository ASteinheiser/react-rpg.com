import React from 'react';

import InventorySlot from './inventory-slot.png';

const EmptySlot = ({ margin, style, className, children }) => {

  const styles = {
    ...style,
    backgroundImage: `url('${InventorySlot}')`,
    width: '40px',
    height: '40px',
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
      width: 40,
      height: 40
    }} />
  );
};

export default EmptySlot;
