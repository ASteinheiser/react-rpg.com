import LeatherArmor  from './armor/leather-armor';
import LeatherBoots  from './armor/leather-boots';
import LeatherCap    from './armor/leather-cap';
import LeatherGloves from './armor/leather-gloves';
import LeatherPants  from './armor/leather-pants';
import OldRing       from './rings/old-ring';
import RustySword    from './weapons/rusty-sword';
import SteelSword    from './weapons/steel-sword';
import DragonsBane   from './weapons/dragons-bane';
import HpPotion      from './other/hp-potion';

const items = {
  weapons: {
    RustySword,
    SteelSword,
    DragonsBane
  },
  armor: {
    LeatherArmor,
    LeatherBoots,
    LeatherCap,
    LeatherGloves,
    LeatherPants
  },
  rings: {
    OldRing
  },
  other: {
    HpPotion
  }
};

export const randomItems = [
  SteelSword,
  LeatherArmor,
  LeatherBoots,
  LeatherCap,
  LeatherGloves,
  LeatherPants,
  OldRing
];

export default items;
