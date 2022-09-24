import 'styled-components';

interface IPalette {
    main: string;
    hover?: string;
}

declare module 'styled-components' {
    export interface DefaultTheme {
        palette: {
            primary: IPalette;
            error: string;
            common: {
                black: string;
                white: string;
                gray: string;
            };
            logo: string;
            heading: string;
            text: string;
            overlay: string;
            horizontalLine: string;
            background: string;
            card: IPalette;
            popup: IPalette;
            popupCard: IPalette;
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
