import {
    STARTING_ABILITY_POINTS,
    STARTING_ABILITY_SCORE_VALUE,
    MAX_ABILITY_SCORE,
} from '../../config/constants';
import resetAbilityScoreValues from '../../utils/reset-starting-abilities';
import setRaceBonus from '../../utils/set-race-bonus';

const initialState = {
    gameText: false,
    gameOver: false,
    gameStart: true,
    gameRunning: false,
    gameSelect: null,
    gameType: null,
    gameWin: false,
    paused: true,
    chest: false,
    chestOpen: false,
    shop: false,
    settings: false,
    inventory: false,
    journalDialog: false,
    journalSideMenuOpen: false,
    spellbookDialog: false,
    levelUp: false,
    fromLevelUp: false,
    abilityDialog: false,
    characterCustomisation: false,
    playerOpenedAbilityDialog: false,
    tutorialDialog: false,
    tutorialPage: 'movement',
    diedFrom: null,
    abilities: {
        constitution: STARTING_ABILITY_SCORE_VALUE,
        dexterity: STARTING_ABILITY_SCORE_VALUE,
        strength: STARTING_ABILITY_SCORE_VALUE,
        wisdom: STARTING_ABILITY_SCORE_VALUE,
        intelligence: STARTING_ABILITY_SCORE_VALUE,
        charisma: STARTING_ABILITY_SCORE_VALUE,
        points: STARTING_ABILITY_POINTS,
    },
    appearance: {
        hairColour: 56,
        skinColour: 48,
        eyeColour: 0,
        armourColour: 230,
        clothesColour: 190,
    },
    abilities_minimum: {
        min_constitution: 0,
        min_dexterity: 0,
        min_strength: 0,
        min_wisdom: 0,
        min_intelligence: 0,
        min_charisma: 0,
    },
    characterCreation: false,
    character: {
        characterName: '',
        characterRace: 'Human',
        characterClass: 'Fighter',
    },
};

const dialogManagerReducer = (state = initialState, { type, payload }) => {
    const {
        abilities,
        abilities_minimum,
        character,
        appearance,
        tutorialPage,
    } = state;
    const {
        constitution,
        intelligence,
        strength,
        dexterity,
        wisdom,
        charisma,
        points,
    } = abilities;

    const {
        min_constitution,
        min_intelligence,
        min_strength,
        min_dexterity,
        min_wisdom,
        min_charisma,
    } = abilities_minimum;

    switch (type) {
        case 'PAUSE':
            const {
                shop,
                chest,
                gameStart,
                inventory,
                gameOver,
                gameText,
                gameWin,
                gameRunning,
                gameSelect,
                characterCreation,
                levelUp,
                fromLevelUp,
                abilityDialog,
                characterCustomisation,
                playerOpenedAbilityDialog,
                pause,
                journalDialog,
                spellbookDialog,
                tutorialDialog,
            } = payload;

            if (journalDialog !== undefined) {
                state.journalSideMenuOpen = journalDialog;
            }

            return {
                ...state,
                levelUp: levelUp || false,
                fromLevelUp: fromLevelUp || false,
                shop: shop || false,
                chest: chest || false,
                gameStart: gameStart || false,
                inventory: inventory || false,
                gameOver: gameOver || false,
                gameRunning: gameRunning || state.gameRunning,
                gameText: gameText || false,
                gameWin: gameWin || false,
                gameSelect: gameSelect || null,
                gameType: gameSelect ? gameSelect : state.gameType,
                abilityDialog: abilityDialog || false,
                playerOpenedAbilityDialog: playerOpenedAbilityDialog || false,
                characterCustomisation: characterCustomisation || false,
                characterCreation: characterCreation || false,
                journalDialog: journalDialog || false,
                spellbookDialog: spellbookDialog || false,
                tutorialDialog: tutorialDialog || false,
                paused: pause,
            };

        case 'PLAYER_DIED':
            return { ...state, diedFrom: payload };

        case 'SET_SHOW_JOURNAL':
            return {
                ...state,
                journalSideMenuOpen: payload,
            };

        case 'SET_CHEST_DATA':
            if (payload) {
                const { gold, exp, item } = payload;
                return {
                    ...state,
                    chestOpen: { gold: gold, exp: exp, item: item },
                };
            } else {
                return { ...state, chestOpen: false };
            }
        case 'OPEN_SETTINGS':
            return { ...state, settings: true };

        case 'CLOSE_SETTINGS':
            return { ...state, settings: false };

        case 'SET_STORY_MAP':
            const { direction, currentMap, storyMaps } = payload;

            const { stairs } = storyMaps[currentMap];

            const nextMap = stairs[direction];

            const { message } = storyMaps[nextMap];
            // if the map has a message and player is going up, display message
            if (message && direction === 'up') {
                return {
                    ...state,
                    paused: true,
                    gameText: {
                        title: message.title,
                        body: message.body,
                    },
                };
            }

            return state;

        case 'SET_RACE':
            return {
                ...state,
                character: {
                    ...character,
                    characterRace: payload.characterRace,
                },
            };

        case 'SET_CLASS':
            return {
                ...state,
                character: {
                    ...character,
                    characterClass: payload.characterClass,
                },
            };

        case 'CREATE_CHARACTER':
            resetAbilityScoreValues(abilities, abilities_minimum);
            setRaceBonus(character.characterRace, abilities, abilities_minimum);
            return {
                ...state,
                character: {
                    characterName: payload.characterName,
                    characterRace: payload.characterRace,
                    characterClass: payload.characterClass,
                },
            };

        case 'SET_HAIR_COLOUR':
            return {
                ...state,
                appearance: {
                    ...appearance,
                    hairColour: payload,
                },
            };

        case 'SET_EYE_COLOUR':
            return {
                ...state,
                appearance: {
                    ...appearance,
                    eyeColour: payload,
                },
            };

        case 'SET_SKIN_COLOUR':
            return {
                ...state,
                appearance: {
                    ...appearance,
                    skinColour: payload,
                },
            };

        case 'SET_ARMOUR_COLOUR':
            return {
                ...state,
                appearance: {
                    ...appearance,
                    armourColour: payload,
                },
            };

        case 'SET_CLOTHES_COLOUR':
            return {
                ...state,
                appearance: {
                    ...appearance,
                    clothesColour: payload,
                },
            };

        case 'SET_PLAYER_APPEARANCE':
            return {
                ...state,
                appearance: {
                    ...appearance,
                    hairColour: payload.hairColour,
                    eyeColour: payload.eyeColour,
                    skinColour: payload.skinColour,
                    armourColour: payload.armourColour,
                    clothesColour: payload.clothesColour,
                },
            };

        case 'LEVEL_UP_ABILITIES':
            return {
                ...state,
                abilities: payload.abilities,
                abilities_minimum: {
                    min_charisma: payload.abilities.charisma,
                    min_constitution: payload.abilities.constitution,
                    min_strength: payload.abilities.strength,
                    min_intelligence: payload.abilities.intelligence,
                    min_wisdom: payload.abilities.wisdom,
                    min_dexterity: payload.abilities.dexterity,
                },
            };

        case 'INCREMENT_CHARISMA':
            if (points < 1 || charisma >= MAX_ABILITY_SCORE) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    charisma: charisma + 1,
                    points: points - 1,
                },
            };
        case 'DECREMENT_CHARISMA':
            if (charisma <= min_charisma) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    charisma: charisma - 1,
                    points: points + 1,
                },
            };
        case 'INCREMENT_CONSTITUTION':
            if (points < 1 || constitution >= MAX_ABILITY_SCORE) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    constitution: constitution + 1,
                    points: points - 1,
                },
            };

        case 'DECREMENT_CONSTITUTION':
            if (constitution <= min_constitution) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    constitution: constitution - 1,
                    points: points + 1,
                },
            };

        case 'INCREMENT_STRENGTH':
            if (points < 1 || strength >= MAX_ABILITY_SCORE) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    strength: strength + 1,
                    points: points - 1,
                },
            };
        case 'DECREMENT_STRENGTH':
            if (strength <= min_strength) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    strength: strength - 1,
                    points: points + 1,
                },
            };

        case 'INCREMENT_WISDOM':
            if (points < 1 || wisdom >= MAX_ABILITY_SCORE) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    wisdom: wisdom + 1,
                    points: points - 1,
                },
            };
        case 'DECREMENT_WISDOM':
            if (wisdom <= min_wisdom) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    wisdom: wisdom - 1,
                    points: points + 1,
                },
            };

        case 'INCREMENT_DEXTERITY':
            if (points < 1 || dexterity >= MAX_ABILITY_SCORE) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    dexterity: dexterity + 1,
                    points: points - 1,
                },
            };
        case 'DECREMENT_DEXTERITY':
            if (dexterity <= min_dexterity) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    dexterity: dexterity - 1,
                    points: points + 1,
                },
            };

        case 'INCREMENT_INTELLIGENCE':
            if (points < 1 || intelligence >= MAX_ABILITY_SCORE) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    intelligence: intelligence + 1,
                    points: points - 1,
                },
            };
        case 'DECREMENT_INTELLIGENCE':
            if (intelligence <= min_intelligence) {
                return { ...state };
            }
            return {
                ...state,
                abilities: {
                    ...abilities,
                    intelligence: intelligence - 1,
                    points: points + 1,
                },
            };

        case 'CHANGE_TUTORIAL_PAGE':
            return {
                ...state,
                tutorialPage: payload.tutorialPage
                    ? payload.tutorialPage
                    : tutorialPage,
            };

        case 'RESET':
            return initialState;

        case 'LOAD_DATA':
            return { ...initialState, ...payload.dialog };

        default:
            return state;
    }
};

export default dialogManagerReducer;
