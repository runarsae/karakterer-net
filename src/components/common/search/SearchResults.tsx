import { Course } from "@prisma/client";
import SearchResult from "./SearchResult";

interface SearchResultsProps {
  courses: Course[];
}

export default function SearchResults({ courses }: SearchResultsProps) {
  return (
    <div className="flex flex-col gap-2 pb-4 md:pb-6">
      {courses.map((course) => (
        <SearchResult key={course.code} code={course.code} name={course.name} />
      ))}
    </div>
  );
}
