export default function logLevelUp() {
    return (disaptch, getState) => {
        disaptch({
            type: 'LEVEL_UP',
            payload: getState().stats.levelUp,
        });
    };
}
