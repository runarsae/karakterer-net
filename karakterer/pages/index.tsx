import HomePage from 'components/home';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemInformation,
    NavigationItemSearch
} from 'components/layout/Navigation';
import { CoursesWithNames, getMostPopularCoursesByViews } from 'lib/getMostPopularCoursesByViews';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

export interface HomePageProps {
    mostPopularCourses: CoursesWithNames;
}

const Index: NextPage<HomePageProps> = (props) => {
    return (
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
                        <NavigationItemInformation />
                    </Navigation>
                }
            />

            <HomePage {...props} />
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const courseData: CoursesWithNames = await getMostPopularCoursesByViews();

    return {
        props: { mostPopularCourses: courseData },
        revalidate: 60 * 60 * 24 // 24 hours
    };
};

export default Index;
