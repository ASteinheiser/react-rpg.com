
export default function isGamePaused() {
  return (_, getState) => {

    const { paused, settings } = getState().dialog;

    return (paused || settings);
  };
}