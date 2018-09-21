import store from '../config/store';

// calculates bonus damage to deal based on attacker's bonus and enemy's type
export default function calculateBonus(playerDamage, monsterType) {
  const { weapon } = store.getState().stats.equippedItems;
  // if there are no bonuses, return normal damage
  if(!weapon || !weapon.bonus) {
    return playerDamage;
  }
  // parse the bonus
  let bonusType = weapon.bonus.split('::')[0];
  let bonusMult = parseInt(weapon.bonus.split('::')[1]);
  // if we have a bonus with this monster
  if(bonusType === monsterType) {
    // apply the bonus
    return playerDamage * bonusMult;
  }
}
