import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import Dashboard from 'components/course/Dashboard';
import { Courses, CourseWithGradesPromise, getCourseData, getMostPopularCourses } from 'api/course';
import { transformCourseData } from 'utils/course';

export type SemesterStats = {
    isGraded: boolean;
    students: number;
    averageGrade: number;
    failPercentage: number;
    letterGrades: (number | null)[];
    passFailGrades: (number | null)[];
};

export type AllSemesterStats = {
    [key: string]: SemesterStats;
};

export interface CourseProps {
    course: string;
    name: string | null;
    hasGrades: boolean;
    hasPassFail: boolean;
    semesters: string[];
    grades: AllSemesterStats;
    averageGrades: number[];
    failPercentages: number[];
    totalAverage: string | null;
    totalAverageLetter: string | null;
    totalFailPercentage: string | null;
}

const Course: NextPage<CourseProps> = (props) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return <Dashboard {...props} />;
};

interface Params extends ParsedUrlQuery {
    id: string[];
}

export const getStaticProps: GetStaticProps<CourseProps, Params> = async (context) => {
    let { id } = context.params!;
    const course = id.join('');

    const courseData: CourseWithGradesPromise = await getCourseData(course);

    if (!courseData) {
        return {
            notFound: true
        };
    }

    return {
        props: transformCourseData(courseData),
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
