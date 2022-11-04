import { HomePageProps } from 'pages';
import useWindowSize from 'utils/windowSize';
import Landing from './Landing';
import MostPopularCourses from './MostPopularCourses';

export default function HomePage({ mostPopularCourses }: HomePageProps) {
    const { width } = useWindowSize();

    if (width) {
        return (
            <>
                <Landing width={width} />
                {mostPopularCourses.length > 0 && (
                    <MostPopularCourses courses={mostPopularCourses} />
                )}
            </>
        );
    }

    return null;
}
