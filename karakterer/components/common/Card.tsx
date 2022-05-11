import styled from 'styled-components';

const Card = styled.div<{ containerFill?: boolean }>((props) => ({
    display: 'block',
    padding: '16px',
    backgroundColor: props.theme.palette.card,
    borderRadius: '4px',
    ...(props.containerFill && { width: '100%', height: '100%' }),

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '24px'
    }
}));

export default Card;
