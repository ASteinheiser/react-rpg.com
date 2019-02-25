import items      from '../../data/items';
import { TIER_2 } from '../../config/constants';
// returns the correct tier of items depending on player level
export default function shopItems(level) {
  if(level < TIER_2) {
    return [
      items.other.BackpackUpgrade,
      items.other.HpPotion,
      items.rings.OldRing,
      items.armor.LeatherBoots,
      items.armor.LeatherGloves,
      items.armor.LeatherCap,
      items.armor.LeatherPants,
      items.armor.LeatherArmor,
      items.weapons.SteelSword
    ];
  }
  else {
    return [
      items.other.BackpackUpgrade,
      items.other.GreatHpPotion,
      items.other.HpPotion,
      items.rings.AmethystRing,
      items.rings.DiamondRing,
      items.armor.SteelBoots,
      items.armor.SteelGloves,
      items.armor.SteelHelm,
      items.armor.SteelPants,
      items.armor.SteelArmor,
      items.weapons.BroadSword,
      items.weapons.DragonsBane,
      items.weapons.LichBane
    ];
  }
}