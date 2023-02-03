import styled from 'styled-components';

const Card = styled.div.attrs({ className: 'card' })((props) => ({
    display: 'block',
    padding: '16px',
    backgroundColor: props.theme.palette.card.main,
    borderRadius: '4px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '24px'
    }
}));

export default Card;
