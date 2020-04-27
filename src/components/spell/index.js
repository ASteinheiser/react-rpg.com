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
    background-image: url('${props => props.spell.image}');
    background-position-x: 0px;
`;

export const CastSpell = ({ spell, startPosition, endPosition, direction }) => {
    let offset_x = 0;
    let offset_y = 0;
    let rotation = '0';
    let reverse = false;

    if (!spell.target.includes('self')) {
        switch (direction) {
            case 'NORTH':
                offset_x = -10;
                offset_y = 10;
                rotation = '270';
                break;

            case 'SOUTH':
                offset_x = -15;
                rotation = '90';
                break;

            case 'EAST':
                offset_y = 5;
                offset_x = -10;
                break;

            case 'WEST':
                rotation = '180';
                break;

            default:
        }
    } else {
        offset_x = -(spell.size.width / 3.5);
        offset_y = -(spell.size.height / 2);

        startPosition = endPosition;

        reverse = true;
    }

    startPosition = [startPosition[0] + offset_x, startPosition[1] + offset_y];
    endPosition = [endPosition[0] + offset_x, endPosition[1] + offset_y];

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
