import Head from 'next/head';
import AboutPage from 'components/about';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemAbout,
    NavigationItemSearch
} from 'components/layout/Navigation';
import { NextPageWithLayout } from 'pages/_app';

const About: NextPageWithLayout = () => {
    return <AboutPage />;
};

About.getLayout = (page) => (
    <>
        <Head>
            <title>{`Om -  karakterer.net`}</title>
            <meta
                name="description"
                content="Detaljert og oppdatert karakterstatistikk for alle emner på Norges teknisk-naturvitenskapelige universitet (NTNU) siden 2004. Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent."
            />
        </Head>

        <Header
            navigation={
                <Navigation>
                    <NavigationItemSearch />
                    <NavigationItemAbout />
                </Navigation>
            }
        />

        {page}
    </>
);

export default About;
