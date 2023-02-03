import styled from 'styled-components';

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
        fontSize: '20px'
    }
}));

const Heading3 = styled.h3((props) => ({
    fontSize: '14px',
    color: props.theme.palette.heading,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '16px'
    }
}));

const Body1 = styled.p((props) => ({
    fontSize: '14px',
    color: props.theme.palette.text,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '16px'
    }
}));

const Body2 = styled.p((props) => ({
    fontSize: '12px',
    color: props.theme.palette.text,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '14px'
    }
}));

const Measurement = styled.p((props) => ({
    fontSize: '20px',
    color: props.theme.palette.heading,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '26px'
    }
}));

export { Heading1, Heading2, Heading3, Body1, Body2, Measurement };
