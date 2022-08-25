import styled from 'styled-components';

const Card = styled.div.attrs({ className: 'card' })<{ containerFill?: boolean }>((props) => ({
    display: 'block',
    padding: '16px',
    backgroundColor: props.theme.palette.card.main,
    borderRadius: '4px',
    ...(props.containerFill && { width: '100%', height: '100%' }),

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '24px'
    }
}));

export default Card;
