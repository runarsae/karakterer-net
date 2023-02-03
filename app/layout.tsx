import { Raleway } from '@next/font/google';
import Layout from 'components/layout/Layout';
import Search from 'components/search';
import { SearchContextProvider } from 'state/search';
import 'styles/globals.css';

const raleway = Raleway({
    subsets: ['latin'],
    weight: '500'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="no">
            <head>
                <title>karakterer.net</title>
                <meta
                    name="description"
                    content="Detaljert og oppdatert karakterstatistikk for alle emner på Norges teknisk-naturvitenskapelige universitet (NTNU) siden 2004. Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent."
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
                <meta name="msapplication-TileColor" content="#000000" />
                <meta name="theme-color" content="#000000" />
            </head>
            <body className={raleway.className}>
                <SearchContextProvider>
                    <Layout>{children}</Layout>
                    <Search />
                </SearchContextProvider>
            </body>
        </html>
    );
}
