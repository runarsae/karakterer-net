import HomePage from 'components/home';
import { CoursesWithNames, getMostPopularCoursesByViews } from 'lib/getMostPopularCoursesByViews';

export const revalidate = 60 * 60 * 24; // 24 hours

export default async function Page() {
    const mostPopularCourses: CoursesWithNames = await getMostPopularCoursesByViews();

    return <HomePage courses={mostPopularCourses} />;
}
