import React from 'react';
import styled, { keyframes } from 'styled-components';

const Div = styled.div`
    position: absolute;
    top: ${props => props.startPosition[1]}px;
    left: ${props => props.startPosition[0]}px;
    width: ${props => props.spell.size.width}px;
    height: ${props => props.spell.size.height}px;
    z-index: 1000;
    animation: ${props => props.animation} .5s steps(${props =>
    props.spell.size.total / props.spell.size.width}) ${props =>
    props.reverse ? 'reverse' : ''};
    background-image: url('${props => props.spell.sprite}');
    background-position-x: 0px;
`;

export const CastSpell = ({ spell, startPosition, endPosition, direction }) => {
    let rotation = '0';
    let reverse = false;

    if (!spell.target.includes('self')) {
        switch (direction) {
            case 'NORTH':
                rotation = '270';
                break;

            case 'SOUTH':
                rotation = '90';
                break;

            case 'EAST':
                break;

            case 'WEST':
                rotation = '180';
                break;

            default:
        }
    } else {
        startPosition = endPosition;
    }

    const animation = keyframes`
    0% {
        transform: rotate(${rotation}deg);
    }

    100% {
        transform: translate(${endPosition[0] -
            startPosition[0]}px, ${endPosition[1] -
        startPosition[1]}px) rotate(${rotation}deg);
        background-position-x: ${spell.size.total}px;
    }
`;

    return (
        <Div
            spell={spell}
            animation={animation}
            startPosition={startPosition}
            reverse={reverse}
        />
    );
};
