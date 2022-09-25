import Head from 'next/head';
import AboutPage from 'components/about';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemInformation,
    NavigationItemSearch
} from 'components/layout/Navigation';
import { NextPageWithLayout } from 'pages/_app';

const About: NextPageWithLayout = () => {
    return <AboutPage />;
};

About.getLayout = (page) => (
    <>
        <Head>
            <title>{`Informasjon - karakterer.net`}</title>
        </Head>

        <Header
            title="Informasjon"
            navigation={
                <Navigation>
                    <NavigationItemSearch />
                    <NavigationItemInformation />
                </Navigation>
            }
        />

        {page}
    </>
);

export default About;
