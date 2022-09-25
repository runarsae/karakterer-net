import { Course } from '@prisma/client';
import apiClient, { fetcher } from 'api/client';
import useSWR from 'swr';
import laggy, { SWRResponseWithLaggy } from 'utils/laggy';

const useCourseSearch = (search?: string) =>
    useSWR<Course[]>(search ? ['/api/courses', { search: search }] : null, fetcher, {
        use: [laggy]
    }) as SWRResponseWithLaggy<Course[]>;

function getCourses(search: string) {
    return apiClient
        .get<Course[]>('/api/courses', {
            params: { search: search }
        })
        .then((response) => response.data);
}

const CourseService = {
    useCourseSearch,
    getCourses
};

export default CourseService;
