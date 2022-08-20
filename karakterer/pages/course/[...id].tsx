import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import CoursePage from 'components/course';
import { SidebarContextProvider } from 'state/sidebar';
import { SettingsContextProvider } from 'state/settings';
import { CourseWithGrades, CourseWithGradesPromise, getCourseData } from 'lib/getCourseData';
import { Courses, getMostPopularCourses } from 'lib/getMostPopularCourses';
import Loading from 'components/layout/Loading';
import { useEffect, useState } from 'react';

const Course: NextPage<CourseWithGrades> = (props) => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url: string) => url !== router.asPath && setLoading(true);
        const handleComplete = (url: string) => url === router.asPath && setLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    });

    if (router.isFallback || loading) {
        return <Loading />;
    }

    return (
        <SidebarContextProvider>
            <SettingsContextProvider grades={props.grades}>
                <CoursePage {...props} />
            </SettingsContextProvider>
        </SidebarContextProvider>
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
    const courses: Courses = await getMostPopularCourses();

    // Get the paths we want to prerender based on the top courses
    const paths = courses.map((course) => {
        return {
            params: { id: [course.course] }
        };
    });

    return { paths: paths, fallback: true };
};

export default Course;
