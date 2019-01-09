import BackpackUpgrade from './other/backpack-upgrade';
import LeatherArmor    from './armor/leather-armor';
import LeatherBoots    from './armor/leather-boots';
import LeatherCap      from './armor/leather-cap';
import LeatherGloves   from './armor/leather-gloves';
import LeatherPants    from './armor/leather-pants';
import SteelArmor      from './armor/steel-armor';
import SteelBoots      from './armor/steel-boots';
import SteelHelm       from './armor/steel-helm';
import SteelGloves     from './armor/steel-gloves';
import SteelPants      from './armor/steel-pants';
import DiamondRing     from './rings/diamond-ring';
import AmethystRing    from './rings/amethyst-ring';
import OldRing         from './rings/old-ring';
import BroadSword      from './weapons/broad-sword';
import RustySword      from './weapons/rusty-sword';
import SteelSword      from './weapons/steel-sword';
import DragonsBane     from './weapons/dragons-bane';
import LichBane        from './weapons/lich-bane';
import HpPotion        from './other/hp-potion';
import GreatHpPotion   from './other/great-hp-potion';

const items = {
  weapons: {
    BroadSword,
    RustySword,
    SteelSword,
    DragonsBane,
    LichBane
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
    HpPotion,
    GreatHpPotion,
    BackpackUpgrade
  }
};

export const randomItemsT1 = [
  SteelSword,
  LeatherArmor,
  LeatherBoots,
  LeatherCap,
  LeatherGloves,
  LeatherPants,
  OldRing
];

export const randomItemsT2 = [
  ...randomItemsT1,
  BroadSword,
  SteelArmor,
  SteelBoots,
  SteelHelm,
  SteelGloves,
  SteelPants,
  AmethystRing,
  DiamondRing
];

export default items;
