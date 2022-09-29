import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import CoursePage from 'components/course';
import { SettingsContextProvider } from 'state/settings';
import { CourseWithGrades, CourseWithGradesPromise, getCourseData } from 'lib/getCourseData';
import { Courses, getMostPopularCoursesByStudents } from 'lib/getMostPopularCoursesByStudents';
import Head from 'next/head';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemAbout,
    NavigationItemSearch,
    NavigationItemSettings
} from 'components/layout/Navigation';
import { NextPageWithLayout } from 'pages/_app';

const Course: NextPageWithLayout<CourseWithGrades> = (props) => {
    return <CoursePage {...props} />;
};

Course.getLayout = (page, props) => (
    <>
        <Head>
            <title>{`${props.course} ${props.name} - karakterer.net`}</title>
            <meta
                name="description"
                content={`Karakterstatistikk for emnet ${props.course} ${props.name} på Norges teknisk-naturvitenskapelige universitet (NTNU).`}
            />
        </Head>
        <SettingsContextProvider grades={props.grades}>
            <Header
                title={`${props.course} ${props.name}`}
                navigation={
                    <Navigation>
                        <NavigationItemSearch />
                        <NavigationItemAbout />
                        <NavigationItemSettings />
                    </Navigation>
                }
            />
            {page}
        </SettingsContextProvider>
    </>
);

interface Params extends ParsedUrlQuery {
    id: string[];
}

export const getStaticProps: GetStaticProps<CourseWithGrades, Params> = async (context) => {
    const { id } = context.params as Params;
    const course = id.join('');

    const courseData: CourseWithGradesPromise = await getCourseData(course);

    if (!courseData || courseData.grades.length === 0) {
        return {
            notFound: true
        };
    }

    return {
        props: courseData,
        revalidate: 60 * 60 * 24 // 24 hours
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const courses: Courses = await getMostPopularCoursesByStudents();

    // Get the paths we want to prerender based on the top courses
    const paths = courses.map((course) => {
        return {
            params: { id: [course.course] }
        };
    });

    return { paths: paths, fallback: 'blocking' };
};

export default Course;
