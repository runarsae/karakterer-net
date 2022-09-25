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
import { ReactElement, ReactNode, useEffect, useState } from 'react';
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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, props: P) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => url !== router.asPath && setLoading(true);
        const handleComplete = () => setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    });

    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider theme={theme}>
            <SearchContextProvider>
                <Layout>
                    {router.isFallback || loading ? (
                        <Loading />
                    ) : (
                        getLayout(<Component {...pageProps} />, pageProps)
                    )}
                    <Search />
                </Layout>
            </SearchContextProvider>
        </ThemeProvider>
    );
}

export default App;
