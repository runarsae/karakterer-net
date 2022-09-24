import { NextPage } from 'next';
import Head from 'next/head';
import AboutPage from 'components/about';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemInformation,
    NavigationItemSearch
} from 'components/layout/Navigation';

const About: NextPage = () => {
    return (
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

            <AboutPage />
        </>
    );
};

export default About;
