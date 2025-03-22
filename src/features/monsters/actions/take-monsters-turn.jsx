import moveNormally from './normal-ai';
import frozen from './frozen-ai';
import poisoned from './poisoned-ai';
import shocked from './shocked-ai';
import scared from './scared-ai';
import suicidal from './suicidal-ai';
import magical from './magical-ai';
import healer from './healer-ai';
import ranged from './ranged-ai';
import frightened from './frightened-ai';

export default function takeMonstersTurn() {
    return (dispatch, getState) => {
        const { monsters, map, world } = getState();
        // get the current monsters
        const { components } = monsters;
        const { sightBox } = map;
        const { currentMap } = world;
        // find each monster

        Object.keys(components[currentMap]).forEach(monsterID => {
            const monster = getState().monsters.components[currentMap][
                monsterID
            ];
            // In the case that one of the other monsters before this one attacked it and killed it
            if (monster === undefined) return;

            switch (monster.ai) {
                case 'suicidal':
                    dispatch(suicidal(sightBox, currentMap, monster));
                    break;
                case 'ranged':
                    dispatch(ranged(sightBox, currentMap, monster));
                    break;
                case 'boss':
                case 'normal':
                    dispatch(moveNormally(sightBox, currentMap, monster));
                    break;
                case 'frozen':
                    dispatch(frozen(sightBox, currentMap, monster));
                    break;
                case 'poisoned':
                    dispatch(poisoned(sightBox, currentMap, monster));
                    break;
                case 'frightened':
                    dispatch(frightened(sightBox, currentMap, monster));
                    break;
                case 'shocked':
                    dispatch(shocked(sightBox, currentMap, monster));
                    break;
                case 'scared':
                    dispatch(scared(sightBox, currentMap, monster));
                    break;
                case 'magical':
                    dispatch(magical(sightBox, currentMap, monster));
                    break;
                case 'healer':
                    dispatch(healer(sightBox, currentMap, monster));
                    break;
                default:
                    break;
            }
        });
    };
}
