import {
    BarController,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineController,
    LineElement,
    PointElement
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Layout from 'components/layout/Layout';
import Loading from 'components/layout/Loading';
import Search from 'components/search';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { SearchContextProvider } from 'state/search';
import { ThemeProvider } from 'styled-components';
import 'styles/globals.css';
import { theme } from 'styles/theme';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartDataLabels,
    PointElement,
    LineElement,
    BarController,
    LineController
);

ChartJS.defaults.font.family = 'Raleway';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, props: P) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider theme={theme}>
            {router.isFallback ? (
                <Loading />
            ) : (
                <SearchContextProvider>
                    <Layout>{getLayout(<Component {...pageProps} />, pageProps)}</Layout>
                    <Search />
                </SearchContextProvider>
            )}
        </ThemeProvider>
    );
}

export default App;
