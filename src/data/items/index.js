import LeatherArmor  from './armor/leather-armor';
import LeatherBoots  from './armor/leather-boots';
import LeatherCap    from './armor/leather-cap';
import LeatherGloves from './armor/leather-gloves';
import OldRing       from './rings/old-ring';
import RustySword    from './weapons/rusty-sword';
import SteelSword    from './weapons/steel-sword';

const items = {
  weapons: {
    RustySword,
    SteelSword
  },
  armor: {
    LeatherArmor,
    LeatherBoots,
    LeatherCap,
    LeatherGloves
  },
  rings: {
    OldRing
  }
};

export const allItems = [
  SteelSword,
  LeatherArmor,
  LeatherBoots,
  LeatherCap,
  LeatherGloves,
  OldRing
];

export default items;
