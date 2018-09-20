import items from '../../data/items';

const shopItems = [
  Object.assign({}, items.weapons.SteelSword, { price: 35 }),
  Object.assign({}, items.armor.LeatherCap, { price: 30 }),
  Object.assign({}, items.armor.LeatherArmor, { price: 40 }),
  Object.assign({}, items.armor.LeatherGloves, { price: 25 }),
  Object.assign({}, items.armor.LeatherBoots, { price: 25 }),
  Object.assign({}, items.armor.OldRing, { price: 25 }),

]

export default shopItems;
