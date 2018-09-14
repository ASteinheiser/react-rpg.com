# RPG Game made with React + Redux

## Install locally and play in your browser
```
git clone https://github.com/ASteinheiser/react-game.git
cd react-game
yarn install
npm start
```

## TODO:
- [ ] hp bar for player and monsters
- [ ] add iron sword +3 damage
- [ ] add gold reward from chest
- [ ] better sprites for rocks/trees
- [ ] add a grass background image
- [ ] add forward and back (map ids) to map properties to allow for going between maps
  - [ ] load map from ids instead of incremental
  - [ ] replace 'move player opposite' function by adding player start pos to map
    - [ ] add move player pos reducer
- [ ] add images for inventory items
  - [ ] load images in equipped slots
- [ ] game dialog component
  - [ ] game over message
  - [ ] initial game message
  - [ ] got loot
  - [ ] killed monster
  - [ ] inventory dialog component
- [ ] monster AI
  - [ ] move towards player if within sight (5 squares)
  - [ ] attack player if within range
  - [ ] move random if no player within sight (5 squares)
- [ ] turn component for calculating player turn, then monster turn
