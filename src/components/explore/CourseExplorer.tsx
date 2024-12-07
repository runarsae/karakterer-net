"use client";

import { useState, useEffect } from "react";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import XIcon from "@/assets/icons/XIcon";
import CourseCard from "../home/mostPopularCourses/CourseCard";

type SortKey = "name" | "grade" | "failPercentage" | "students" | "semester";
type GradeType = "avgGrade" | "medianGrade" | "modeGrade";
type FilterType = "lowFailRate" | "highGrade" | "largeCourse" | "semester";

interface Filters {
  lowFailRate: boolean;
  highGrade: boolean;
  largeCourse: boolean;
  semester: "all" | "høst" | "vår";
}

interface Course {
  id: number;
  code: string;
  name: string;
  avgGrade: number;
  medianGrade: number;
  modeGrade: number;
  failPercentage: number;
  students: number;
  semester: string;
}

export default function CourseExplorer() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [gradeType, setGradeType] = useState<GradeType>("avgGrade");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    lowFailRate: false,
    highGrade: false,
    largeCourse: false,
    semester: "all",
  });
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        params.append("sortKey", sortKey);
        params.append("sortDirection", sortDirection);
        params.append("gradeType", gradeType);
        params.append("lowFailRate", filters.lowFailRate.toString());
        params.append("highGrade", filters.highGrade.toString());
        params.append("largeCourse", filters.largeCourse.toString());
        params.append("semester", filters.semester);

        const response = await fetch(`/api/explore?${params.toString()}`);
        if (response.ok) {
          const data: Course[] = await response.json();
          setCourses(data);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [search, sortKey, sortDirection, gradeType, filters]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const toggleFilter = (filter: FilterType) => {
    if (filter === "semester") {
      setFilters((prev) => ({
        ...prev,
        semester:
          prev.semester === "all"
            ? "høst"
            : prev.semester === "høst"
              ? "vår"
              : "all",
      }));
    } else {
      setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
    }
  };

  const gradeTypeLabels: Record<GradeType, string> = {
    avgGrade: "Gjennomsnittskarakter",
    medianGrade: "Mediankarakter",
    modeGrade: "Mode karakter",
  };

  return (
    <div className="pb-8">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-400">Kurs Oversikt</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Søk etter kurs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-neutral-800 bg-gray-950 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-8 rounded-lg bg-gray-900 p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-400">
            Filtrer og Sorter
          </h2>

          <div className="mb-6 flex flex-wrap gap-3">
            {Object.entries(filters).map(([key, value]) => (
              <button
                key={key}
                onClick={() => toggleFilter(key as FilterType)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  value
                    ? "bg-blue-800 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-800"
                }`}
              >
                {key === "semester"
                  ? filters.semester === "all"
                    ? "Alle semestre"
                    : `Semester: ${filters.semester}`
                  : key === "lowFailRate"
                    ? "Lav strykprosent"
                    : key === "highGrade"
                      ? "Høy karakter"
                      : "Store kurs"}
                {value && key !== "semester" && (
                  <XIcon className="ml-2 inline-block h-4 w-4" />
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {gradeTypeLabels[gradeType]}
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-56 rounded-md bg-gray-900 shadow-lg">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    {Object.entries(gradeTypeLabels).map(([key, label]) => (
                      <button
                        key={key}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-800 hover:text-gray-200"
                        role="menuitem"
                        onClick={() => {
                          setGradeType(key as GradeType);
                          setSortKey("grade");
                          setIsDropdownOpen(false);
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {["name", "grade", "failPercentage", "students", "semester"].map(
              (key) => (
                <button
                  key={key}
                  onClick={() => toggleSort(key as SortKey)}
                  className="rounded bg-gray-900 px-3 py-2 text-sm font-medium text-gray-200 transition-colors duration-200 hover:bg-gray-800"
                >
                  {key === "name"
                    ? "Fagkode"
                    : key === "grade"
                      ? gradeTypeLabels[gradeType]
                      : key === "failPercentage"
                        ? "Stryk %"
                        : key === "students"
                          ? "Studenter"
                          : "Semester"}
                  {sortKey === key && (sortDirection === "asc" ? " ↑" : " ↓")}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard
                key={course.id}
                code={course.code}
                name={course.name}
                moreInfo={{
                  avgGrade: course.avgGrade,
                  medianGrade: course.medianGrade,
                  modeGrade: course.modeGrade,
                  failPercentage: course.failPercentage,
                  students: course.students,
                  semester: course.semester,
                }}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-600">
              Ingen kurs funnet med de valgte filtrene.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
