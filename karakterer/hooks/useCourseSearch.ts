import CourseService from 'api/services/course';
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

function useCourseSearch() {
    const [search, _setSearch] = useState<string>('');

    const debouncedSearch = useDebounce(search, 200);
    const debouncedSearchValid = debouncedSearch.length >= 3;

    const {
        data: courses,
        isValidating,
        error,
        isLagging
    } = CourseService.useCourseSearch(debouncedSearchValid ? debouncedSearch : undefined);

    const loading = (isValidating && !error && !courses) || isLagging;

    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        if (courses && courses.length === 0) {
            setErrorMessage('Ingen emner med gitt kode/navn.');
        } else {
            setErrorMessage(undefined);
        }
    }, [courses]);

    useEffect(() => {
        if (error) {
            setErrorMessage('Kunne ikke hente emner.');
        }
    }, [error]);

    const setSearch = (search: string) => {
        _setSearch(search);
    };

    return { search, setSearch, courses, loading, error: errorMessage };
}

export default useCourseSearch;
