import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes({
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
});

const LoadingIndicator = styled.div(
    (props) => ({
        border: `2px solid ${props.theme.palette.popup}`,
        borderTop: `2px solid ${props.theme.palette.primary.main}`,
        borderRadius: '50%',
        width: '22px',
        height: '22px'
    }),
    css`
        animation: ${rotate} 1s linear infinite;
    `
);

export default LoadingIndicator;
