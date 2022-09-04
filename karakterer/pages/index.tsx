import Section from 'components/common/Section';
import Landing from 'components/home/Landing';
import MostPopularCourses from 'components/home/MostPopularCourses';
import Header from 'components/layout/Header';
import { CoursesWithNames, getMostPopularCoursesByViews } from 'lib/getMostPopularCoursesByViews';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

const Content = styled.div((props) => ({
    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '32px 0'
    }
}));

interface Props {
    mostPopularCourses: CoursesWithNames;
}

const Index: NextPage<Props> = ({ mostPopularCourses }) => {
    return (
        <>
            <Head>
                <title>karakterer.net</title>
                <meta
                    name="description"
                    content="Detaljert og oppdatert karakterstatistikk for alle emner på Norges teknisk-naturvitenskapelige universitet (NTNU) siden 2004. Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent."
                />
            </Head>
            <Content>
                <Header />
                <Landing />

                {mostPopularCourses.length > 0 && (
                    <MostPopularCourses courses={mostPopularCourses} />
                )}
            </Content>
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
