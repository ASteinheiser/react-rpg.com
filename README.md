# RPG Game made with React + Redux

## Install locally and play in your browser
```
git clone https://github.com/ASteinheiser/react-game.git
cd react-game
yarn install
npm start
```

## TODO:
- [ ] add fog of war
  - [ ] list of 'viewed' or 'explored' tiles saved with map values
  - [ ] add isPlayerInSight func() to monsters to show monster
- [ ] link monster original position to the map
  - [ ] add original position to monster properties
  - [ ] remove monster from 'map' reference on death to enable persistent death between maps
- [ ] calculate defence during attacks
- [ ] got loot from chest dialog
- [ ] initial game dialog
- [ ] victory dialog
  - [ ] check if all monsters have been killed
- [ ] pop-ups
  - [ ] tried to pick up item with full inventory
  - [ ] dealing damage
  - [ ] killed monster
  - [ ] gained exp & gold
#

- [ ] add chance for random item drop from chests
- [ ] add chance for random item drop from monsters
- [ ] add gold from monsters
- [ ] add shop to spend gold on healing or items
- [ ] turn component for calculating player turn, then monster turn
  - [ ] monster AI
    - [ ] move towards player if within sight (5 squares)
    - [ ] attack player if within range
    - [ ] move random if no player within sight (5 squares)
- [ ] auto-generated levels (https://medium.freecodecamp.org/how-to-make-your-own-procedural-dungeon-map-generator-using-the-random-walk-algorithm-e0085c8aa9a)
