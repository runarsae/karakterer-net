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
