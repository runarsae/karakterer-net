import HomePage from 'components/home';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemAbout,
    NavigationItemSearch
} from 'components/layout/Navigation';
import { CoursesWithNames, getMostPopularCoursesByViews } from 'lib/getMostPopularCoursesByViews';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';

export interface HomePageProps {
    mostPopularCourses: CoursesWithNames;
}

const Index: NextPageWithLayout<HomePageProps> = (props) => {
    return <HomePage {...props} />;
};

Index.getLayout = (page) => (
    <>
        <Head>
            <title>karakterer.net</title>
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

export const getStaticProps: GetStaticProps = async () => {
    const courseData: CoursesWithNames = await getMostPopularCoursesByViews();

    return {
        props: { mostPopularCourses: courseData },
        revalidate: 60 * 60 * 24 // 24 hours
    };
};

export default Index;
