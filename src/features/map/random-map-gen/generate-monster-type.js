// generates a random monster type based on player level and a random chance
export default function generateMonsterType(playerLv) {
  // generate a number between 1 - 100
  const chance = Math.floor(Math.random() * 100) + 1;
  // if player is level 1 - 2
  if (playerLv <= 2) {
    if (chance <= 10) { // 10% chance to spawn a goblin
      return 'goblin';
    } // 90% chance to spawn a rat
    else {
      return 'rat';
    }
  } // if player is level 3 - 6
  else if (playerLv <= 6 && playerLv >= 3) {
    if (chance <= 10) { // 10% chance to spawn stone golem
      return 'stone-golem';
    } // 40% chance to spawn goblin
    else if (chance <= 50 && chance > 10) {
      return 'goblin';
    } // 50% chance to spawn a rat
    else {
      return 'rat';
    }
  } // if player is level 7 - 9
  else if (playerLv <= 9 && playerLv >= 7) {
    if (chance <= 10) { // 10% chance to spawn imp
      return 'imp';
    } // 40% chance to spawn stone golem
    else if (chance <= 50 && chance > 10) {
      return 'stone-golem';
    } // 50% chance to spawn a goblin
    else {
      return 'goblin';
    }
  } // if player is level 10 - 12
  else if (playerLv <= 12 && playerLv >= 10) {
    if (chance <= 30) { // 30% chance to spawn imp
      return 'imp';
    } // 40% chance to spawn stone golem
    else if (chance <= 70 && chance > 30) {
      return 'stone-golem';
    } // 30% chance to spawn goblin
    else {
      return 'goblin';
    }
  } // if player is level 13 - 15
  else if (playerLv <= 15 && playerLv >= 13) {
    if (chance <= 10) { // 10% chance to spawn dragon
      return 'dragon';
    } // 40% chance to spawn imp
    else if (chance <= 50 && chance > 10) {
      return 'imp';
    } // 50% chance to spawn a stone-golem
    else {
      return 'stone-golem';
    }
  } // if player is level 16 - 18
  else if (playerLv <= 18 && playerLv >= 16) {
    if (chance <= 30) { // 30% chance to spawn dragon
      return 'dragon';
    } // 40% chance to spawn imp
    else if (chance <= 70 && chance > 30) {
      return 'imp';
    } // 30% chance to spawn a stone-golem
    else {
      return 'stone-golem';
    }
  } // if player is level 19 - 21
  else if (playerLv <= 21 && playerLv >= 19) {
    if (chance <= 10) { // 10% chance to spawn lich
      return 'lich';
    } // 40% chance to spawn dragon
    else if (chance <= 50 && chance > 10) {
      return 'dragon';
    } // 50% chance to spawn a imp
    else {
      return 'imp';
    }
  } // if player is level 22 - 24
  else if (playerLv <= 24 && playerLv >= 22) {
    if (chance <= 30) { // 30% chance to spawn lich
      return 'lich';
    } // 40% chance to spawn dragon
    else if (chance <= 70 && chance > 30) {
      return 'dragon';
    } // 30% chance to spawn a imp
    else {
      return 'imp';
    }
  } // if player is level 25 - 27
  else if (playerLv <= 27 && playerLv >= 25) {
    if (chance <= 60) { // 60% chance to spawn lich
      return 'lich';
    } // 40% chance to spawn dragon
    else {
      return 'dragon';
    }
  } // if player is level 28 or greater
  else if (playerLv >= 28) {
    return 'lich';
  }
}