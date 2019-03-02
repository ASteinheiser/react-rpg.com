// calculates bonus damage to deal based on attacker's bonus and enemy's type
export default function calculateBonus(playerDamage, monsterType, weaponBonus) {
  // if there are no bonuses, return normal damage
  if(!weaponBonus) {
    return playerDamage;
  }
  // parse the bonus
  const [bonusType] = weaponBonus.split('::');
  const bonusMult = parseFloat(weaponBonus.split('::')[1], 10);
  // if we have a bonus with this monster
  if(bonusType === monsterType) {
    // apply the bonus
    return playerDamage * bonusMult;
  } // otherwise return normal damage
  else {
    return playerDamage;
  }
}
