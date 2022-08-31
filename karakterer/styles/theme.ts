import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    palette: {
        primary: {
            main: '#158ad5',
            hover: '#1068A0'
        },
        error: '#c14d4d',
        common: {
            black: '#0e0e0e',
            white: '#FFFFFF',
            gray: '#F5F5F5'
        },
        heading: '#e7e7e7',
        text: '#999999',
        overlay: 'rgba(0, 0, 0, 0.7)',
        horizontalLine: '#363636',
        background: '#000000',
        card: {
            main: '#121212'
        },
        popup: {
            main: '#1c1c1c',
            hover: '#161616'
        },
        popupCard: {
            main: '#282828',
            hover: '#202020'
        }
    },
    breakpoints: {
        xs: 375,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400
    },
    transitionDuration: 150,
    borderRadius: 4
};
