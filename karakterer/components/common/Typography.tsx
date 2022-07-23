import { CSSProperties } from 'react';
import styled, { DefaultTheme, StyledComponent } from 'styled-components';

const Heading1 = styled.h1((props) => ({
    fontSize: '18px',
    color: props.theme.palette.heading,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: '24px'
    }
}));

const Heading2 = styled.h2((props) => ({
    fontSize: '16px',
    color: props.theme.palette.heading,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '18px'
    }
}));

const Heading3 = styled.h3((props) => ({
    fontSize: '16px',
    color: props.theme.palette.heading
}));

const Heading4 = styled.h4((props) => ({
    fontSize: '14px',
    color: props.theme.palette.heading
}));

const Body1 = styled.p((props) => ({
    fontSize: '12px',
    color: props.theme.palette.text,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '14px'
    }
}));

const Body2 = styled.p((props) => ({
    fontSize: '10px',
    color: props.theme.palette.text,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '12px'
    }
}));

const Button = styled.p({
    fontSize: '14px'
});

const Measurement = styled.p((props) => ({
    fontSize: '20px',
    color: props.theme.palette.heading,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '26px'
    }
}));

type Variants = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'body3' | 'button' | 'measurement';

const variantsMapping: {
    [index: string]: StyledComponent<
        keyof JSX.IntrinsicElements | React.ComponentType<any>,
        DefaultTheme,
        {},
        never
    >;
} = {
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    body1: Body1,
    body2: Body2,
    button: Button,
    measurement: Measurement
};

const Component = styled.span((props) => ({
    transition: 'color ' + props.theme.transitionDuration + 'ms ease-in-out',
    ...props.style
}));

interface Props {
    children: React.ReactNode;
    variant?: Variants;
    style?: CSSProperties;
    className?: string;
}

function Typography(props: Props) {
    return (
        <Component
            className={props.className}
            as={props.variant ? variantsMapping[props.variant] : Body1}
            style={props.style}
        >
            {props.children}
        </Component>
    );
}

export default Typography;
