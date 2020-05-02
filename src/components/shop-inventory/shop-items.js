import items from '../../data/items';
import { TIER_2 } from '../../config/constants';
// returns the correct tier of items depending on player level
export default function shopItems(level) {
    if (level < TIER_2) {
        return [
            items.other.BackpackUpgrade,
            items.potions.HpPotion,
            items.potions.GreatHpPotion,
            items.rings.OldRing,
            items.clothes.armor.LeatherBoots,
            items.clothes.armor.LeatherGloves,
            items.clothes.armor.LeatherCap,
            items.clothes.armor.LeatherPants,
            items.clothes.armor.LeatherArmor,
            items.clothes.robes.BlackRobes,
            items.clothes.robes.BrownRobes,
            items.weapons.swords.SteelSword,
            items.weapons.staffs.BlackStaff,
            items.weapons.staffs.BrownStaff,
            // items.weapons.ranged.Boomerang,
            // items.weapons.ranged.Slingshot,
        ];
    } else {
        return [
            items.other.BackpackUpgrade,
            items.potions.HpPotion,
            items.potions.GreatHpPotion,
            // items.potions.MightyHpPotion,
            // items.potions.DivineHpPotion,
            items.potions.MightyManaPotion,
            items.potions.DivineManaPotion,
            items.rings.AmethystRing,
            items.rings.DiamondRing,
            items.clothes.armor.SteelBoots,
            items.clothes.armor.SteelGloves,
            items.clothes.armor.SteelHelm,
            items.clothes.armor.SteelPants,
            items.clothes.armor.SteelArmor,
            items.clothes.robes.RedRobes,
            items.clothes.robes.TealRobes,
            items.clothes.robes.SkullRobes,
            items.weapons.swords.BroadSword,
            items.weapons.swords.DragonsBane,
            items.weapons.swords.LichBane,
            items.weapons.staffs.RedStaff,
            items.weapons.staffs.TealStaff,
            items.weapons.staffs.SkullStaff,
            // items.weapons.ranged.Bow,
            // items.weapons.ranged.Crossbow,
        ];
    }
}
