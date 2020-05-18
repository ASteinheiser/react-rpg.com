import moveNormally from './normal-ai';
import frozen from './frozen-ai';
import poisoned from './poisoned-ai';
import shocked from './shocked-ai';
import scared from './scared-ai';
import frightened from './frightened-ai';

export default function takeMonstersTurn() {
    return (dispatch, getState) => {
        const { monsters, map, world } = getState();
        // get the current monsters
        const { components } = monsters;
        const { sightBox } = map;
        const { currentMap } = world;
        // find each monster

        Object.entries(components[currentMap]).forEach(([, monster]) => {
            switch (monster.ai) {
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
                default:
                    break;
            }
        });
    };
}
