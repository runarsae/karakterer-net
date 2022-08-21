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
        error: '#ea5151',
        success: '#18A813',
        common: {
            black: '#0e0e0e',
            white: '#FFFFFF',
            gray: '#F5F5F5'
        },
        background: '#000000',
        heading: '#CECECE',
        text: '#999999',
        overlay: 'rgba(0, 0, 0, 0.5)',
        horizontalLine: '#363636',
        inputBackground: '',
        card: {
            main: '#101010'
        },
        popup: {
            main: '#1c1c1c',
            hover: '#161616'
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
