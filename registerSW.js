if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('https://react-rpg.com/sw.js', { scope: 'https://react-rpg.com/' })})}