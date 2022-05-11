import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    palette: {
        primary: {
            main: '#3E95CD',
            dark: '',
            light: ''
        },
        secondary: {
            main: '',
            dark: '',
            light: ''
        },
        error: '#DD1E1E',
        success: '#18A813',
        common: {
            black: '#0e0e0e',
            white: '#FFFFFF',
            gray: '#F5F5F5'
        },
        heading: '#CECECE',
        text: '#999999',
        overlay: 'rgba(0, 0, 0, 0.85)',
        horizontalLine: '#363636',
        inputBackground: '',
        card: '#171717',
        popup: '#252525'
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
