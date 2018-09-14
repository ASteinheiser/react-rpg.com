import LeatherArmor from './armor/leather-armor';
import LeatherCap   from './armor/leather-cap';
import OldRing      from './rings/old-ring';
import RustySword   from './weapons/rusty-sword';
import SteelSword   from './weapons/steel-sword';

const items = {
  weapons: {
    RustySword,
    SteelSword
  },
  armor: {
    LeatherArmor,
    LeatherCap
  },
  rings: {
    OldRing
  }
};

export default items;
