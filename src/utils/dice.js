// Create an 'unbiased' roll
const unbiased = sides => Math.floor(Math.random() * sides) + 1;

// Create a 'biased' dice roll, either to the maximum or the minimum value, if not specified, return an unbiased roll
const biased = to => {
    if (to === 'max') {
        return sides => sides;
    } else if (to === 'min') {
        return _ => 1;
    }
    return unbiased();
};

const ops = {
    '+': {
        precedence: 1,
        op: (left, right) => {
            if (Array.isArray(left)) {
                left = left.reduce((sum, value) => sum + value);
            }
            if (Array.isArray(right)) {
                right = right.reduce((sum, value) => sum + value);
            }
            return parseInt(left) + parseInt(right);
        },
    },
    '-': {
        precedence: 1,
        op: (left, right) => {
            if (Array.isArray(left)) {
                left = left.reduce((sum, value) => sum + value);
            }
            if (Array.isArray(right)) {
                right = right.reduce((sum, value) => sum + value);
            }
            return parseInt(left) - parseInt(right);
        },
    },
    '*': {
        precedence: 2,
        op: (left, right) => {
            if (Array.isArray(left)) {
                left = left.reduce((sum, value) => sum + value);
            }
            if (Array.isArray(right)) {
                right = right.reduce((sum, value) => sum + value);
            }
            return parseInt(left) * parseInt(right);
        },
    },
    '/': {
        precedence: 2,
        op: (left, right) => {
            if (Array.isArray(left)) {
                left = left.reduce((sum, value) => sum + value);
            }
            if (Array.isArray(right)) {
                right = right.reduce((sum, value) => sum + value);
            }
            return parseInt(left) / parseInt(right);
        },
    },
    l: {
        precedence: 3,
        op: (left, right) => {
            // Remove the lowest `right` number of rolls
            return left.sort().splice(right);
        },
    },
    h: {
        precedence: 3,
        op: (left, right) => {
            // Select the highest `right` number of rolls
            return left.sort((l, r) => r - l).splice(right);
        },
    },
    d: {
        precedence: 4,
        op: (left, right, criticalHit, die) => {
            const mul = parseInt(left) * criticalHit ? 2 : 1;
            const sides = parseInt(right);
            const rolls = [];
            for (let i = 0; i < mul; i++) {
                rolls.push(die(sides));
            }
            return rolls;
        },
    },
};

const peek = a => a[a.length - 1];

const reorder = (stack, token, out) => {
    while (
        peek(stack) in ops &&
        ops[token].precedence <= ops[peek(stack)].precedence
    ) {
        out.push(stack.pop());
    }
};

const isNumber = str => {
    for (let i = 0; i < str.length; i++) {
        const ch = str.charAt(i);
        if (ch < '0' || ch > '9') {
            return false;
        }
    }

    return true;
};

const lex = expression => {
    return expression
        .split('')
        .reduce((output, token) => {
            if (token in ops) {
                output.push(token);
            } else if (token === '(' || token === ')') {
                output.push(token);
            } else if (token.trim().length > 0) {
                if (output.length > 0 && isNumber(output[output.length - 1])) {
                    output.push(output.pop() + token);
                } else {
                    output.push(token);
                }
            }

            return output;
        }, [])
        .join(' ');
};

// Djikstra's shunting yard algorithm to convert infix notation to postfix notation
const yard = infix => {
    let stack = [];

    return infix
        .split(' ')
        .reduce((output, token) => {
            if (token in ops) {
                reorder(stack, token, output);
                stack.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                while (peek(stack) !== '(') output.push(stack.pop());
                stack.pop();
            } else if (isNumber(token)) {
                // It's just a number, so put it to the output
                output.push(token);
            } else if (token.includes('d')) {
                // We have a dice throw
                let tokens = token.split('d');

                // This is the multiplier, so push it to the output
                output.push(tokens[0]);
                reorder(stack, 'd', output);
                stack.push('d');

                const selector = tokens[1].includes('l')
                    ? 'l' // Remove the lowest n throws
                    : tokens[1].includes('h')
                    ? 'h' // Take the highest n throws
                    : null;

                if (selector !== null) {
                    let selected = tokens[1].split(selector);
                    // Push the sides of the dice regardless
                    output.push(selected[0]);

                    reorder(stack, selector, output);
                    stack.push(selector);
                    output.push(selected[1]);
                } else {
                    // No selector, just the sides left
                    output.push(tokens[1]);
                }
            }

            return output;
        }, [])
        .concat(stack.reverse())
        .join(' ');
};

// Evaluate a reverse polish notation (postfix) expression
const rpn = (postfix, criticalHit, die) => {
    const evaluated = postfix
        .split(' ')
        .reduce((stack, token) => {
            if (token in ops) {
                let right = stack.pop();
                let left = stack.pop();
                stack.push(ops[token].op(left, right, criticalHit, die));
            } else {
                stack.push(token);
            }

            return stack;
        }, [])
        .pop();

    return Array.isArray(evaluated) // We can either get a value here, or an array (indicating the last item is a dice roll)
        ? evaluated.reduce((sum, value) => sum + value, 0)
        : evaluated;
};

const parse = (notation, criticalHit, dice) =>
    rpn(yard(lex(notation)), criticalHit, dice);

export const calculateDamageRange = notation => {
    const min = parse(notation, biased('min'));
    const max = parse(notation, biased('max'));
    return [min, max];
};

// Calculates damage to deal based on Dice Notation (https://en.wikipedia.org/wiki/Dice_notation)
export const calculateDamage = (notation, criticalHit) =>
    parse(notation, criticalHit, unbiased);

export const d20 = () => Math.floor(Math.random() * 20) + 1;
