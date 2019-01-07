import LeatherArmor  from './armor/leather-armor';
import LeatherBoots  from './armor/leather-boots';
import LeatherCap    from './armor/leather-cap';
import LeatherGloves from './armor/leather-gloves';
import LeatherPants  from './armor/leather-pants';
import SteelArmor    from './armor/steel-armor';
import SteelBoots    from './armor/steel-boots';
import SteelHelm     from './armor/steel-helm';
import SteelGloves   from './armor/steel-gloves';
import SteelPants    from './armor/steel-pants';
import DiamondRing   from './rings/diamond-ring';
import AmethystRing  from './rings/amethyst-ring';
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
    LeatherPants,
    SteelArmor,
    SteelBoots,
    SteelHelm,
    SteelGloves,
    SteelPants
  },
  rings: {
    AmethystRing,
    DiamondRing,
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
