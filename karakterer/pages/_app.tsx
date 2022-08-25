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
import { SidebarContextProvider } from 'state/sidebar';
import Sidebar from 'components/common/Sidebar';
import { ModalContextProvider } from 'state/modal';
import Modal from 'components/common/Modal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from 'components/layout/Loading';

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

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => url !== router.asPath && setLoading(true);
        const handleComplete = (url: string) => url === router.asPath && setLoading(false);

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
            <SidebarContextProvider>
                <ModalContextProvider>
                    <Layout>
                        {router.isFallback || loading ? <Loading /> : <Component {...pageProps} />}
                        <Sidebar />
                        <Modal />
                    </Layout>
                </ModalContextProvider>
            </SidebarContextProvider>
        </ThemeProvider>
    );
}

export default App;
