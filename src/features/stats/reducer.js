
const initialState = {
  hp: 10,
  maxHp: 10,
  damage: 2,
  defence: 0,
  level: 0,
  exp: 0,
  expToLevel: 20,
  gold: 0,
  equippedItems: {}
};

const statsReducer = (state = initialState, action) => {

  let newState = Object.assign({}, state);

  switch(action.type) {

    case 'GET_GOLD':
      // add gold to current gold
      newState.gold += action.payload.value;

      return newState;

    case 'UNEQUIP_ITEM':
      let data = action.payload.data;
      // check the type
      switch(data.type) {
        case 'weapon':
          newState.damage -= data.damage;
          delete newState.equippedItems['weapon'];
          break;

        case 'armor::body':
          newState.defence -= data.defence;
          delete newState.equippedItems['armor']['body'];
          break;

        case 'armor::helmet':
          newState.defence -= data.defence;
          delete newState.equippedItems['armor']['helmet'];
          break;

        case 'ring':
          // iterate over each effect
          Object.keys(data.effect).forEach(effectName => {

            switch (effectName) {

              case 'damage':
                newState.damage -= data.effect[effectName];
                break;

              case 'hp':
                newState.hp -= data.effect[effectName];
                newState.maxHp -= data.effect[effectName];
                break;

              default:
            }
          });
          delete newState.equippedItems['ring'];

          break;

        default:
      }

      return newState;

    case 'EQUIP_ITEM':
      let item = action.payload;
      // see what type of item it is
      switch(item.type) {

        case 'weapon':
          newState.damage += item.damage;
          newState.equippedItems['weapon'] = item;
          break;

        case 'armor::body':
          newState.defence += item.defence;
          // safely add new armor peice to object
          newState.equippedItems['armor'] = Object.assign({}, newState.equippedItems['armor'], { body: item });
          break;

        case 'armor::helmet':
          newState.defence += item.defence;
          // safely add new armor peice to object
          newState.equippedItems['armor'] = Object.assign({}, newState.equippedItems['armor'], { helmet: item });
          break;

        case 'ring':
          // iterate over each effect
          Object.keys(item.effect).forEach(effectName => {

            switch (effectName) {

              case 'damage':
                newState.damage += item.effect[effectName];
                break;

              case 'hp':
                newState.hp += item.effect[effectName];
                newState.maxHp += item.effect[effectName];
                break;

              default:
            }
          });

          newState.equippedItems['ring'] = item;
          break;

        default:
      }
      return newState;

    case 'DAMAGE_TO_PLAYER':
      const { damage } = action.payload;
      // deal damage to player
      newState.hp -= damage;

      return newState;

    case 'GET_EXP':
      let newExp = action.payload.value;
      let newTotalExp = state.exp + newExp;
      let expToLevel = state.expToLevel;
      // if they are leveling up
      if(newTotalExp >= expToLevel) {
        // increment level
        newState.level += 1;

        // calculate leftover exp if it isn't exactly enough
        if(!(newState.exp === expToLevel)) {
          let leftoverExp = (newTotalExp) % expToLevel;
          newState.exp = leftoverExp;
        }

        // set next exp goal to be 1.5 times as much
        newState.expToLevel = state.expToLevel * 1.5;

        // get more maxHp and currHp (roll 1-5)
        let moreHp = Math.floor(Math.random() * 5) + 1;
        newState.hp += moreHp;
        newState.maxHp += moreHp;

        // get more damage (+1)
        newState.damage += 1;

      } else {
        // they aren't leveling up
        newState.exp += newExp;
      }

      return newState;

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

export default statsReducer;
