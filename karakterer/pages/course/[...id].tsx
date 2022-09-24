import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import CoursePage from 'components/course';
import { SettingsContextProvider } from 'state/settings';
import { CourseWithGrades, CourseWithGradesPromise, getCourseData } from 'lib/getCourseData';
import { Courses, getMostPopularCoursesByStudents } from 'lib/getMostPopularCoursesByStudents';
import Head from 'next/head';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemInformation,
    NavigationItemSearch,
    NavigationItemSettings
} from 'components/layout/Navigation';

const Course: NextPage<CourseWithGrades> = (props) => {
    return (
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
                            <NavigationItemInformation />
                            <NavigationItemSettings />
                        </Navigation>
                    }
                />

                <CoursePage {...props} />
            </SettingsContextProvider>
        </>
    );
};

interface Params extends ParsedUrlQuery {
    id: string[];
}

export const getStaticProps: GetStaticProps<CourseWithGrades, Params> = async (context) => {
    let { id } = context.params!;
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

    return { paths: paths, fallback: true };
};

export default Course;
