# The Design Vision for Roll For Reaction
This document describes the vision that I have, personally, for what the project can become. It is **not expected** that this project will be able to realise this vision within the timeframe we have, but my hope is that by putting these ideas in writing I can provide the project with a solid sense of *direction*. That being said, I've divided my ideas into several categories:

- Character Creation
    - Races
    - Classes
- Level Design
- Exploration
    - Items
- Combat
    - Player Turn
    - Enemy Turn
- Spellcasting

## Character Creation
Upon starting the game, the player will be presented with a dialog box that allows them to choose between a randomly generated character or create their own custom character. When creating their own character, there are several attributes they can customise, not all of which are relevant for gameplay but wil assist a player in taking ownership of their character:

- Name
- Race
- Class
- Stats
- Hairstyle
- Skin Colour
- Hair Colour
- Outfit Colour

Each of the above attributes can individually randomised. In addition, when generating a random character the player will be asked to confirm their character, giving them the option to customise an attribute of the generated character. For example, perhaps a player wants to play a *Fighter* character, but is ambivalent to other attributes. They can simply generate the character, then change the class and start the game. There are several races and classes available to the player, each of which carry different and unique bonuses or abilities. 

### Stats
In accordance with *Dungeons and Dragons (Fifth Edition)*, a character has ability scores which correlate to their stats. Each ability score is a single number, typically between 1 and 30, which indicates a character's prowess in that stat. Based on this ability score, an ability bonus is calculated which is added to dice rolls the player makes when determining actions relevant to that stat.

Ability score numbers are calculated based on 4d6 dice rolls. For each ability score, 4d6 are rolled. The lowest roll is dropped and the sum of the remaining 3 are used as the ability score.

#### Constitution
Measuring endurance, this is used in calculating a character's hit points (HP). In addition to the base HP of a character decided by a dice roll, additional HP equal to *Ability Bonus * Level* is given.

In addition to that, the *Ability Bonus* is added to the dice roll made when performing death saving throws.

#### Dexterity
Measuring agility, this is used when determining who moves first in battle - their *reaction*. Which they roll for, naturally. The ability bonus is added to the dice roll when determining a character's reaction.

In addition to that, the ability bonus is also added to a character's *Armour Class* (AC) on top of the number they receive from their equipped armour.

This is also used for ranged attack rolls.

#### Strength
Measuring physcial power, the ability bonus contributes to the amount of items that can be carried by a character independent of carrying capacity bonuses granted by backpacks.

This is also used for melee attack rolls.

#### Wisdom
Measuring perception and insight, this is used for identifying weaknesses in enemies. A character may receive advantage on rolls (attack or otherwise) they perform against enemies depending on the result of a Wisdom check.

Wisdom checks are performed by rolling a d20 and adding the *Wisdom Ability Bonus*, then comparing this against the *Defence Class* (DC). If the sum of the roll and the bonus are higher than the DC, then the character in question gains advantage against that enemy.

*Note: Advantage refers to rolling twice and taking the higher roll*

#### Charisma
Measuring force of personality, this is used for bartering with shop owners. Depending on the ability bonus, a character will receive higher or lower prices when shopping for negative and positive ability bonuses, respectively.

#### Intelligence
Measuring reasoning and memory, this is used to determine the *Mana Points* (MP) available to a character. A character's MP is their *Intelligence Ability Bonus* multiplied by 10, with negative bonuses meaning 0 MP.

This is also used for spellcasting attack rolls.

### Races
*Dungeons and Dragons (Fifth Edition)* contains a wide-ranging and diverse set of races, but to satisfy this project I believe only including a few races is necessary. Each race comes with bonuses to certain character stats, as well as a different starting item.

#### Human
- Ability Score Bonuses
    - Strength +5
    - Intelligence -1
- Special Item
    - Shield (+3 to AC)

#### Elf
- Ability Score Bonuses
    - Dexterity +2
    - Charisma +2
- Special Item
    - Swift Boots (+2 to Reaction)

#### Dwarf
- Ability Score Bonuses
    - Constitution +2
    - Wisdom +2
- Special Item
    - 100 Gold + Ale (applies debuff)

### Classes
There are many classes in *Dungeons and Dragons (Fifth Edition)*, but for the purposes of this project I am only concerned with including a small subset of those classes. Each class will have certain characteristics unique to that class, as well as having specialised focus in certain statistics. 

Different classes have different types of dice that are used for calculating their *Hit Points* (HP). HP is calculated by summing up dice rolls, with one roll per level and then adding the *Constitution Ability Bonus*. For example, the Fighter uses a d8 as it's *Hit Die*, so to calculate the health of a Level 3 Fighter; roll 3 d8, sum up the rolls and add the *Constitution Ability Bonus*.

All classes start with at least one weapon, some clothing, a backpack and 50 gold pieces (GP).

#### Fighter
This class relies predominantly on melee attacks, but typically carries a small ranged weapon for when enemies are too far away.
- Starting Items
    - Shortsword (1d8)
    - Slingshot (1d4)
    - Chainmail (AC 14)
        - Helmet (AC 3)
        - Gloves (AC 2)
        - Chest (AC 7)
        - Boots (AC 2)

#### Ranger
This class relies predominantly on ranged attacks, but typically carries a small melee weapon for when combat gets close-quarters.
- Starting Items
    - Longbow (1d6)
    - Dagger (1d4)
    - Leather Armour (AC 10)
        - Helmet (AC 2)
        - Gloves (AC 1)
        - Chest (AC 6)
        - Boots (AC 1)

#### Warlock
This class relies predominantly on spellcasting, and while they do conceal a small melee weapon for emergencies, it is often too late by the time it needs to be used.
- Starting Items
    - Dagger (1d4)
    - Robes (AC 5)
    - Spellbook

## Level Design
Currently, the levels are designed as closed dungeons with narrow corridors and a fog-of-war to represent the dark depths of said dungeons. In this project, I envision wider, open spaces, perhaps a sprawling forest or an abandoned temple. In particular, I'd like to do away completely with the fog-of-war and allow the player to see more of the level on a wider are of the screen at any one time. 

Levels shall still contain the usual suspects - chests, enemies and occasionally, a shop. The enemies will no longer be completely isolated, and will tend to be found in groups at higher levels. Chests can be found throughout each level, with different levels of rarity ranging from *Common* (brown) to *Rare* (silver) to *Super Rare* (gold). Every second level will have a shop available, and this should be easily located near the beginning of the level.

## Exploration
As the player traverses the different levels, they will face enemies in combat, uncover items in chests and barter with a merchant at a shop - all in pursuit of The Holy Factor.

While out of combat, there are very few actions the player can take. Given that there are no enemies to attack, the player's only option is to explore - searching for chests, enemies or the end of the level.

The game naturally ends when The Holy Factor is retreived after defeating the monster that guards it.

### Items
There are various items that can be obtained from chests during the game. These can be separated into three categories; consumables, equipment and special items.
- Consumables
    - HP Potion
    - MP Potion
    - Scrolls
        - Fire
        - Ice
        - Wind
        - Water
        - Lightning
- Equipment
    - Weapons
        - Dagger (1d4)
        - Shortsword (1d8)
        - Longsword (1d12)
        - Slingshot (1d4)
        - Longbow (1d6)
        - Crossbow (1d10)
        - Godslayer (5d20)
        - Heaven Piercer (5d20)
    - Armour
        - Leather (AC 10)
        - Chain Mail (AC 14)
        - Steel (AC 22)
        - Adamantium Steel (AC 30)
    - Clothes
        - Rags
        - Robes
        - Master Robes
- Special
    - Spellbook (2 spells per level)
    - Shield (+3 to AC)
    - Ale

## Combat
When an enemy becomes in range of the player character, there is the opportunity for a combat encounter to start.

At the beginning of the combat encounter, the player's character and the enemies they are facing *Roll For Reaction*. This involves rollling a d20 and adding the *Dexterity Ability Bonus* of each entity. The result from the player's character is then compared to the highest result of all of the enemies; whomever is higher takes the first turn in the battle.

Each turn in a battle allows a movement and an action to take place. Movement allows an entity to move a number of tiles according to its speed, whereas an action can involve the entity attacking, casting a spell or retreating from battle.

### Player Turn
On a player's turn, there are several options for them to choose from:
- Move
- Attack (must be a creature in range)
- Cast Spell
- Retreat

### Enemy Turn
Enemies take their turn one at a time, in order of their *Reaction*. Each enemy will attempt to attack the player's character to the best of their ability. This may involve the enemy moving into range to attack the player's character.

## Spellcasting
Instead of the spell slot system present in DnD, I've decided that it would be more straightforward to fallback to traditional mana-based systems.

Spells still have levels, and this is what determines their mana cost. Spells don't have a cooldown; only a mana cost.

When out of combat, a character's mana pool regenerates passively at a fixed rate which is a percentage of their maximum mana per decisecond (1/10th of a second).