import { BASE_HEALTH, MIN_HEALTH_BONUS } from '../config/constants';

export default function calculateMaxHpPool(level, constitutionBonus) {
    let healthBonus =
        constitutionBonus >= 0
            ? level * (5 + constitutionBonus)
            : level * MIN_HEALTH_BONUS - MIN_HEALTH_BONUS;
    return BASE_HEALTH + healthBonus;
}
