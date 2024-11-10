import { Course } from "@prisma/client";
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { useSWRWithLaggy } from "@/lib/swr/useSWRWithLaggy";

interface CourseSearch {
  courses?: Course[];
  isLoading: boolean;
  error?: string;
}

function useCourseSearch(search: string): CourseSearch {
  const [errorMessage, setErrorMessage] = useState<string>();

  const searchIsValid = search.length >= 3;

  const debouncedSearch = useDebounce(search, 200);
  const deboundedSearchIsValid = debouncedSearch.length >= 3;

  const {
    data: courses,
    isValidating,
    error,
    isLagging,
    resetLaggy,
  } = useSWRWithLaggy<Course[]>(
    searchIsValid && deboundedSearchIsValid
      ? ["/api/courses", { search: debouncedSearch }]
      : null,
  );

  const isLoading = (isValidating && !error && !courses) || isLagging;

  useEffect(() => {
    if (!searchIsValid) {
      resetLaggy();
    }
  }, [resetLaggy, searchIsValid]);

  useEffect(() => {
    if (courses && courses.length === 0 && !isValidating && !isLagging) {
      setErrorMessage("Ingen emner med gitt kode eller navn.");
    } else {
      setErrorMessage(undefined);
    }
  }, [courses, isLagging, isValidating]);

  useEffect(() => {
    if (error) {
      setErrorMessage("Kunne ikke hente emner.");
    }
  }, [error]);

  return {
    courses: courses,
    isLoading,
    error: errorMessage,
  };
}

export default useCourseSearch;
