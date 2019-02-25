
const phrases = [
  'You are a weak mortal...',
  'Not that strong after all...',
  'Now who will save the princess?',
  'Muhahaha... Bwahahaha!!'
];

export default function randomPhrase() {
  const randomNumber = Math.floor(Math.random() * phrases.length);
  return phrases[randomNumber];
}
