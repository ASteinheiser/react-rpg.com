# Roadmap

## What's done
- Currently there are two game modes
  - Story mode has static set of maps
  - Endless mode generates new floors on demand
- Player movement and attack is controlled by keyboard or touch
- Basic inventory system
  - Weapon, Ring, Armor, Pants, Gloves, Boots, Helmet
- Basic stat system
  - Attack
  - Defense
  - Hp
- Chests drop exp and gold, 25% chance for loot
- 6 monster types
  - rat
  - goblin
  - stone golem
  - imp
  - dragon
  - lich
- Shops
  - sell health potions
  - 2 tiers of items, leather and steel
  - 2 specialty weapons (bonus to monster types: dragon, lich)
- Basic dialog system for inventory, settings, and other dialogs

## What needs to be done
### Soon
- Player and monster stats need a rebalance ([#41](https://github.com/ASteinheiser/react-rpg.com/issues/41))
- Add a level up dialog ([#11](https://github.com/ASteinheiser/react-rpg.com/issues/11))
- Allow player to see EXP and HP values ([#35](https://github.com/ASteinheiser/react-rpg.com/issues/35))
- Inventory items should leave backpack when equipped ([#25](https://github.com/ASteinheiser/react-rpg.com/issues/25))
- Clean up viewport sizing logic and add magnified size for large desktop ([#12](https://github.com/ASteinheiser/react-rpg.com/issues/12))
### Upcoming
- Add player classes
  - Add Archer class
    - Add Dexterity stat
  - Add Warrior class
    - Add Strength stat
  - Remove Attack stat
- Add ranged monster types
- Offer stat points upon level up that the player can distribute
- Add hybrid weapon types
  - Use two stats as primary stats for calculating damage
  - Offer multiplier based on how close two stats are in value
### Future
- Add Mage class
  - Add Magic stat
  - Add concept of Mana
- Add weapons that use mana when it's available for a ranged magic attack
  - When no mana available, performs a melee attack
- Player accounts (saved in cloud)
  - Save and load games
  - Introduce achievements to track progress
    - Earn special currency (trophies) for achievements
- Spend trophies on PvP gear
  - No real stat advantage, but gives player unique buff
- PvP game mode (Colosseum)
  - Battle other players over WebSocket
  - Players are all same level and get to distribute stat points themselves
  - Players are given access to basic weapons of all types