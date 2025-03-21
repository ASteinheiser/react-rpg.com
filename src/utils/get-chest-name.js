/**
 * Generate a name for a chest at a given position.
 *
 * As it is not possible for two chests to be at the same position on
 * any given map, this should be unique.
 *
 * @param {*} map The map the player is on
 * @param {*} x The x co-ordinate of the chest
 * @param {*} y The y co-ordinate of the chest
 */
export function getChestName(map, x, y) {
    return map + '(' + x + ',' + y + ')';
}
