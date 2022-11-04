import { Keyframes, keyframes } from 'styled-components';

export enum AnimationType {
    FadeIn = 'FadeIn',
    SlideInUp = 'SlideInUp',
    Rotate = 'Rotate'
}

export const animations: { [key in AnimationType]: Keyframes } = {
    [AnimationType.FadeIn]: keyframes({
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 1
        }
    }),
    [AnimationType.SlideInUp]: keyframes({
        '0%': {
            transform: 'translateY(100%)'
        },
        '100%': {
            transform: 'translateY(0)'
        }
    }),
    [AnimationType.Rotate]: keyframes({
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    })
};
