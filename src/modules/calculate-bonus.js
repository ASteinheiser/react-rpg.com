// calculates bonus damage to deal based on attacker's bonus and enemy's type
export default function calculateBonus(playerDamage, monsterType, weapon) {
  // if there are no bonuses, return normal damage
  if(!weapon || !weapon.bonus) {
    return playerDamage;
  }
  // parse the bonus
  let bonusType = weapon.bonus.split('::')[0];
  let bonusMult = parseFloat(weapon.bonus.split('::')[1], 10);
  // if we have a bonus with this monster
  if(bonusType === monsterType) {
    // apply the bonus
    return playerDamage * bonusMult;
  } else {
    // otherwise return normal damage
    return playerDamage;
  }
}
