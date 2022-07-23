import { Course } from '@prisma/client';
import apiClient, { fetcher } from 'api/client';
import useSWR from 'swr';

function useCourseSearch(search: string) {
    const searchValid = search.length >= 3;

    const { data, error, isValidating } = useSWR<Course[]>(
        searchValid ? ['/api/courses', { search: search }] : null,
        fetcher
    );

    return {
        courses: data,
        isValidating: isValidating,
        isLoading: !error && !data,
        isError: error
    };
}
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
