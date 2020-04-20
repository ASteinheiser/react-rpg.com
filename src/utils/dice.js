const unbiased = () => {
    return sides => Math.floor(Math.random() * sides) + 1;
};

const biased = to => {
    if (to === 'max') {
        return sides => sides;
    } else if (to === 'min') {
        return _ => 1;
    }
};

const ops = {
    '+': {
        precedence: 1,
        op: (left, right, _) => {
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
        op: (left, right, _) => {
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
        op: (left, right, _) => {
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
        op: (left, right, _) => {
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
        op: (left, right, _) => {
            // Remove the lowest `right` number of rolls
            return left.sort().splice(right);
        },
    },
    h: {
        precedence: 3,
        op: (left, right, _) => {
            // Select the highest `right` number of rolls
            return left.sort((l, r) => r - l).splice(right);
        },
    },
    d: {
        precedence: 4,
        op: (left, right, die) => {
            let mul = parseInt(left);
            let sides = parseInt(right);
            let rolls = [];
            for (let i = 0; i < mul; i++) {
                rolls.push(die(sides));
            }
            return rolls;
        },
    },
};

// Djikstra's shunting yard algorithm to convert infix notation to postfix notation
let yard = infix => {
    let peek = a => a[a.length - 1];
    let stack = [];

    return infix
        .split('')
        .reduce((output, token) => {
            if (token in ops) {
                while (
                    peek(stack) in ops &&
                    ops[token].precedence <= ops[peek(stack)].precedence
                )
                    output.push(stack.pop());
                stack.push(token);
            } else if (parseInt(token)) {
                output.push(token);
            } else if (token === '(') {
                stack.push(token);
            } else if (token === ')') {
                while (peek(stack) !== '(') output.push(stack.pop());
                stack.pop();
            }

            return output;
        }, [])
        .concat(stack.reverse())
        .join(' ');
};

const rpn = (postfix, die) => {
    let stack = [];

    postfix.split(' ').forEach(token => {
        if (token in ops) {
            let right = stack.pop();
            let left = stack.pop();
            stack.push(ops[token].op(left, right, die));
        } else {
            stack.push(token);
        }
    });

    return stack[0];
};

export const calculateDamageRange = notation => {
    const pf = yard(notation);
    const min = rpn(pf, biased('min'));
    const max = rpn(pf, biased('max'));
    return [min, max];
};

// Calculates damage to deal based on Dice Notation (https://en.wikipedia.org/wiki/Dice_notation)
export default function calculateDamage(notation) {
    const damage = rpn(yard(notation), unbiased());
    return damage;
}
