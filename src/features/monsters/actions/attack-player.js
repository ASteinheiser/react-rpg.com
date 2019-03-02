import calculateDamage from '../../../utils/calculate-damage';

export default function attackPlayer(monsterDamage) {
  return (dispatch, getState) => {

    const { stats } = getState();
    const calculatedMonsterDamage = calculateDamage(monsterDamage, stats.defence);

    dispatch({
      type: 'DAMAGE_TO_PLAYER',
      payload: calculatedMonsterDamage
    });
    // show the attack animation and play sound
    dispatch({
      type: 'MONSTER_ATTACK',
      payload: null
    });
    // check if player died
    if((stats.hp - calculatedMonsterDamage) <= 0) {
      // play death sound
      dispatch({
        type: 'PLAYER_DIED',
        payload: null
      });
      // if it did, game over
      dispatch({
        type: 'PAUSE',
        payload: {
          gameOver: true,
          pause: true
        }
      });
    }
  };
}
