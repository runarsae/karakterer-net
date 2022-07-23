import 'styled-components';

interface IPalette {
    main: string;
    light?: string;
    dark?: string;
}

declare module 'styled-components' {
    export interface DefaultTheme {
        palette: {
            primary: IPalette;
            secondary: IPalette;
            error: string;
            success: string;
            common: {
                black: string;
                white: string;
                gray: string;
            };
            background: string;
            heading: string;
            text: string;
            overlay: string;
            horizontalLine: string;
            inputBackground: string;
            card: string;
            popup: string;
        };
        breakpoints: {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
            xxl: number;
        };
        transitionDuration: number;
        borderRadius: number;
    }
}
