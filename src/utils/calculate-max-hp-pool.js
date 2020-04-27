import { BASE_HEALTH, MIN_HEALTH_BONUS } from '../config/constants';

export default function calculateMaxHpPool(level, constitutionBonus) {
    return (
        BASE_HEALTH +
        (level - 1) *
            (constitutionBonus >= 0 ? constitutionBonus + 2 : MIN_HEALTH_BONUS)
    );
}
