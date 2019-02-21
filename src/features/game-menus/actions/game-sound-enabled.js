
export default function gameSoundEnabled() {
  return (_, getState) => {
    return getState().gameMenu.sound;
  };
}