// Check if the level the player is at provides them with more ability points.
export default function isAbilityAllocationLevel(level) {
    return level % 5 === 1;
}
