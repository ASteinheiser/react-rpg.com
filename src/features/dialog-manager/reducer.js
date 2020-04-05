import {
    STARTING_ABILITY_POINTS,
    STARTING_ABILITY_SCORE_VALUE,
    MAX_ABILITY_SCORE,
} from '../../config/constants';

const initialState = {
    gameText: false,
    gameOver: false,
    gameStart: true,
    gameInstructions: false,
    gameSelect: null,
    gameWin: false,
    paused: true,
    chest: false,
    chestOpen: false,
    shop: false,
    settings: false,
    inventory: false,
    levelUp: false,
    abilityDialog: false,
    abilities: {
        constitution: STARTING_ABILITY_SCORE_VALUE,
        dexterity: STARTING_ABILITY_SCORE_VALUE,
        strength: STARTING_ABILITY_SCORE_VALUE,
        wisdom: STARTING_ABILITY_SCORE_VALUE,
        intelligence: STARTING_ABILITY_SCORE_VALUE,
        charisma: STARTING_ABILITY_SCORE_VALUE,
        points: STARTING_ABILITY_POINTS,
    },
};

const dialogManagerReducer = (state = initialState, { type, payload }) => {
    const { abilities } = state;
    const {
        constitution,
        intelligence,
        strength,
        dexterity,
        wisdom,
        charisma,
        points,
    } = abilities;

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
                gameSelect,
                gameInstructions,
                levelUp,
                abilityDialog,
                pause,
            } = payload;

            return {
                ...state,
                levelUp: levelUp || false,
                shop: shop || false,
                chest: chest || false,
                gameStart: gameStart || false,
                inventory: inventory || false,
                gameOver: gameOver || false,
                gameText: gameText || false,
                gameWin: gameWin || false,
                gameSelect: gameSelect || null,
                gameInstructions: gameInstructions || false,
                abilityDialog: abilityDialog || false,
                paused: pause,
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
            if (charisma < 1) {
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
            if (constitution < 1) {
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
            if (strength < 1) {
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
            if (wisdom < 1) {
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
            if (dexterity < 1) {
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
            if (intelligence < 1) {
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

        case 'RESET':
            return initialState;

        default:
            return state;
    }
};

export default dialogManagerReducer;
