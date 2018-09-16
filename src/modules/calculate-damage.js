
// calculates damage to deal based on attacker's damage and enemy's defence
export default function calculateDamage(damage, defence) {
  // this function should result in 50% damage mitigation when
  // defence = attack, but should also scale up and down without
  // ever ignoring all damage, or attacking for extra damage
  let damageToDeal = (damage * damage / (damage + defence));
  // round number up to prevent decimals and 0 damage case
  damageToDeal = Math.ceil(damageToDeal);
  // return damage
  return damageToDeal;
}
