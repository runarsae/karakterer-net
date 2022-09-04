import styled from 'styled-components';

const Section = styled.div<{ size?: 'small' | 'normal' }>((props) => ({
    padding: '16px',
    maxWidth: props.size == 'small' ? '768px' : '1440px',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '32px',
        gap: '24px'
    }
}));

export default Section;
