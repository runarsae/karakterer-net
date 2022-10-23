import { HomePageProps } from 'pages';
import Landing from './Landing';
import MostPopularCourses from './MostPopularCourses';

export default function HomePage({ mostPopularCourses }: HomePageProps) {
    return (
        <>
            <Landing />
            {mostPopularCourses.length > 0 && <MostPopularCourses courses={mostPopularCourses} />}
        </>
    );
}
