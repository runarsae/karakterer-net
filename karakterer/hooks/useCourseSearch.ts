import { Course } from '@prisma/client';
import CourseService from 'api/services/course';
import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

export interface CourseSearch {
    search: string;
    setSearch: (search: string) => void;
    courses?: Course[];
    error?: string;
    loading: boolean;
}

function useCourseSearch(): CourseSearch {
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
        if (courses && courses.length === 0 && !isValidating && !isLagging) {
            setErrorMessage('Ingen emner med gitt kode eller navn.');
        } else {
            setErrorMessage(undefined);
        }
    }, [courses, isLagging, isValidating]);

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
