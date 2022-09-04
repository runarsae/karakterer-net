import styled from 'styled-components';

const Wrapper = styled.div((props) => ({
    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '32px 0'
    }
}));

export default Wrapper;
