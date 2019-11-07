// we need to ensure the chest stays open if we level up
export default function closeLevelUpDialog() {
  return (dispatch, getState) => {
    const { chest } = getState().dialog;
    dispatch({
      type: 'PAUSE',
      payload: {
        pause: chest,
        chest
      }
    });
  };
}