// generates a random monster type based on player level and a random chance
export default function generateMonsterType(playerLv) {
  // generate a number between 1 - 100
  const chance = Math.floor(Math.random() * 100) + 1;
  // if player is level 1 - 2
  if (playerLv <= 2) {
    if (chance <= 10) { // 10% chance to spawn a goblin
      return 'goblin';
    } else { // 90% chance to spawn a rat
      return 'rat';
    }
  } // if player is level 3 - 5
  else if (playerLv <= 5 && playerLv >= 3) {
    if (chance <= 10) { // 10% chance to spawn stone golem
      return 'stone-golem';
    } else if (chance <= 50 && chance > 10) { // 40% chance to spawn goblin
      return 'goblin';
    } else { // 50% chance to spawn a rat
      return 'rat';
    }
  } // if player is level 6 - 8
  else if (playerLv <= 8 && playerLv >= 6) {
    if (chance <= 10) { // 10% chance to spawn dragon
      return 'dragon';
    } else if (chance <= 50 && chance > 10) { // 40% chance to spawn stone golem
      return 'stone-golem';
    } else { // 50% chance to spawn a goblin
      return 'goblin';
    }
  } // if player is level 9 - 11
  else if (playerLv <= 11 && playerLv >= 9) {
    if (chance <= 30) { // 30% chance to spawn dragon
      return 'dragon';
    } else if (chance <= 70 && chance > 30) { // 40% chance to spawn stone golem
      return 'stone-golem';
    } else { // 30% chance to spawn goblin
      return 'goblin';
    }
  } // if player is level 12 - 14
  else if (playerLv <= 14 && playerLv >= 12) {
    if (chance <= 50) { // 50% chance to spawn dragon
      return 'dragon';
    } else { // 50% chance to spawn stone golem
      return 'stone-golem';
    }
  } // if player is level 15 or greater
  else if (playerLv >= 15) {
    if (chance <= 90) { // 90% chance to spawn dragon
      return 'dragon';
    } else { // 10% chance to spawn stone golem
      return 'stone-golem';
    }
  }
}