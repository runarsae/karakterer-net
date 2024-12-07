"use client";

import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import XIcon from "@/assets/icons/XIcon";
import { useState, useMemo } from "react";
import CourseCard from "../home/mostPopularCourses/CourseCard";

const courses = [
  {
    id: 1,
    code: "MATH101",
    name: "Mathematics",
    avgGrade: 3.8,
    medianGrade: 4.0,
    modeGrade: 4,
    failPercentage: 15,
    students: 120,
    semester: "høst",
  },
  {
    id: 2,
    code: "PHYS201",
    name: "Physics",
    avgGrade: 3.5,
    medianGrade: 3.5,
    modeGrade: 3,
    failPercentage: 20,
    students: 80,
    semester: "vår",
  },
  {
    id: 3,
    code: "CS301",
    name: "Computer Science",
    avgGrade: 4.2,
    medianGrade: 4.0,
    modeGrade: 5,
    failPercentage: 10,
    students: 150,
    semester: "høst",
  },
  {
    id: 4,
    code: "BIO401",
    name: "Biology",
    avgGrade: 3.9,
    medianGrade: 4.0,
    modeGrade: 4,
    failPercentage: 12,
    students: 100,
    semester: "vår",
  },
  {
    id: 5,
    code: "CHEM501",
    name: "Chemistry",
    avgGrade: 3.7,
    medianGrade: 3.5,
    modeGrade: 4,
    failPercentage: 18,
    students: 90,
    semester: "høst",
  },
];

type SortKey = "name" | "grade" | "failPercentage" | "students" | "semester";
type GradeType = "avgGrade" | "medianGrade" | "modeGrade";
type FilterType = "lowFailRate" | "highGrade" | "largeCourse" | "semester";

interface Filters {
  lowFailRate: boolean;
  highGrade: boolean;
  largeCourse: boolean;
  semester: "all" | "høst" | "vår";
}

export default function CourseExplorer() {
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

  const sortedAndFilteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        if (filters.lowFailRate && course.failPercentage > 15) return false;
        if (filters.highGrade && course[gradeType] < 4.0) return false;
        if (filters.largeCourse && course.students < 100) return false;
        if (filters.semester !== "all" && course.semester !== filters.semester)
          return false;
        return true;
      })
      .sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortKey === "grade") {
          aValue = a[gradeType];
          bValue = b[gradeType];
        } else {
          aValue = a[sortKey];
          bValue = b[sortKey];
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [sortKey, sortDirection, gradeType, filters]);

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
    <div className="min-h-screen py-8">
      <div className="container mx-auto max-w-5xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-400">Kurs Oversikt</h1>

        <div className="mb-8 rounded-lg bg-gray-800/50 p-6 shadow-md">
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
          {sortedAndFilteredCourses.length > 0 ? (
            sortedAndFilteredCourses.map((course) => (
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
