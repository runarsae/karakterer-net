import styled from 'styled-components';

const ActionButton = styled.button((props) => ({
    border: 'none',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    userSelect: 'none',
    backgroundColor: props.theme.palette.primary.main,
    color: props.theme.palette.common.white,
    padding: '16px 32px',
    borderRadius: '1000px',
    fontSize: '14px',
    transition: `background-color ${props.theme.transitionDuration}ms ease-in-out`,

    '@media (hover: hover)': {
        ':hover': {
            backgroundColor: props.theme.palette.primary.hover
        }
    },

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '16px'
    }
}));

export default ActionButton;
