import { ReactNode } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { animations, AnimationType } from './animations';

const Wrapper = styled.div<{
    animation: FlattenSimpleInterpolation;
    count?: number;
    delay?: number;
    duration?: number;
    timingFunction?: string;
    disabled?: boolean;
}>`
    animation-delay: ${(props) => props.delay || 0}ms;
    animation-duration: ${(props) => props.duration || 500}ms;
    animation-timing-function: ${(props) => props.timingFunction || 'ease'};
    animation-direction: normal;
    animation-fill-mode: both;
    animation-iteration-count: ${(props) => props.count || 'infinite'};
    animation-name: ${(props) => props.animation};
`;

interface Props {
    children?: ReactNode;
    type: AnimationType;
    count?: number;
    delay?: number;
    duration?: number;
    timingFunction?: string;
    disabled?: boolean;
}

function Animation({ children, type, disabled, ...props }: Props) {
    if (disabled) {
        return <>{children}</>;
    }

    const animation = css`
        ${animations[type]};
    `;

    return (
        <Wrapper animation={animation} {...props}>
            {children}
        </Wrapper>
    );
}

export default Animation;
