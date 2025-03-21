import React from 'react';
import styled, { keyframes } from 'styled-components';

const Div = styled.div`
    position: absolute;
    top: ${props => props.startPosition[1]}px;
    left: ${props => props.startPosition[0]}px;
    width: ${props => props.projectile.size.width}px;
    height: ${props => props.projectile.size.height}px;
    z-index: 1000;
    animation: ${props => props.animation} .5s steps(${props =>
    props.projectile.size.total / props.projectile.size.width});
    background-image: url('${props => props.projectile.sprite}');
    background-position-x: 0px;
`;

export const Animation = ({
    projectile,
    startPosition,
    endPosition,
    direction,
}) => {
    let rotation = '0';

    if (!projectile.target.includes('self')) {
        // If the target is the caster, then we will want to rotate the
        // sprite such that it at least looks like it's going the right way
        // Note: This is troublesome when you use a sprite that isn't mirrored horizontally
        //       (it will appear upside down).
        switch (direction) {
            case 'NORTH':
                rotation = '270';
                break;

            case 'SOUTH':
                rotation = '90';
                break;

            case 'WEST':
                rotation = '180';
                break;

            default:
        }
    } else {
        endPosition = startPosition;
    }

    const animation = keyframes`
    0% {
        transform: rotate(${rotation}deg);
    }

    100% {
        transform: translate(${endPosition[0] -
            startPosition[0]}px, ${endPosition[1] -
        startPosition[1]}px) rotate(${rotation}deg);
        background-position-x: ${projectile.size.total}px;
    }
`;

    return (
        <Div
            projectile={projectile}
            animation={animation}
            startPosition={startPosition}
        />
    );
};

export default Animation;
