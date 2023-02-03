'use client';

import { CoursesWithNames } from 'lib/getMostPopularCoursesByViews';
import Landing from './Landing';
import CoursesGrid from './CoursesGrid';

export default function HomePage({ courses }: { courses: CoursesWithNames }) {
    return (
        <>
            <Landing />
            {courses.length > 0 && <CoursesGrid courses={courses} />}
        </>
    );
}
