import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes({
    '0%': {
        transform: 'rotate(0deg)'
    },
    '100%': {
        transform: 'rotate(360deg)'
    }
});

const LoadingIndicator = styled.div<{ size?: 'large' | 'normal' }>(
    (props) => ({
        border: `2px solid ${props.theme.palette.popup.main}`,
        borderTop: `2px solid ${props.theme.palette.primary.main}`,
        borderRadius: '50%',
        width: props.size === 'large' ? '40px' : '22px',
        height: props.size === 'large' ? '40px' : '22px'
    }),
    css`
        animation: ${rotate} 1s linear infinite;
    `
);

export default LoadingIndicator;
