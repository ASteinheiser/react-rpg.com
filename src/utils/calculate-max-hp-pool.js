import { BASE_HEALTH } from '../config/constants';

export default function calculateMaxHpPool(level, constitutionBonus) {
    return (
        BASE_HEALTH +
        (level - 1) * (constitutionBonus >= 0 ? constitutionBonus + 1 : 0)
    );
}
