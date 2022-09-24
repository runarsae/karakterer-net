import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    BarController,
    LineController
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Layout from 'components/layout/Layout';
import { SearchContextProvider } from 'state/search';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Search from 'components/search';

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

function App({ Component, pageProps }: AppProps) {
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

    return (
        <ThemeProvider theme={theme}>
            <SearchContextProvider>
                <Layout loading={router.isFallback || loading}>
                    <Component {...pageProps} />
                    <Search />
                </Layout>
            </SearchContextProvider>
        </ThemeProvider>
    );
}

export default App;
