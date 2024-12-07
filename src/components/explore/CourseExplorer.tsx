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
    <div className="min-h-screen text-white">
      <div className="container mx-auto w-full max-w-4xl px-4 py-8">
        <div className="mb-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => toggleFilter("lowFailRate")}
            className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
              filters.lowFailRate
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Strykprosent
            {filters.lowFailRate && (
              <XIcon className="ml-1 inline-block h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => toggleFilter("highGrade")}
            className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
              filters.highGrade
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Høyt karaktergjennomsnitt
            {filters.highGrade && (
              <XIcon className="ml-1 inline-block h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => toggleFilter("largeCourse")}
            className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
              filters.largeCourse
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Stort antall studenter
            {filters.largeCourse && (
              <XIcon className="ml-1 inline-block h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => toggleFilter("semester")}
            className={`rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
              filters.semester !== "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {filters.semester === "all"
              ? "Alle semestre"
              : `Semester: ${filters.semester}`}
            {filters.semester !== "all" && (
              <XIcon className="ml-1 inline-block h-4 w-4" />
            )}
          </button>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <div className="relative inline-block text-left">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {gradeTypeLabels[gradeType]}{" "}
              {sortKey === "grade" && (sortDirection === "asc" ? "↑" : "↓")}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {Object.entries(gradeTypeLabels).map(([key, label]) => (
                    <button
                      key={key}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors duration-200 hover:bg-gray-600 hover:text-white"
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
          <div className="flex items-center space-x-2">
            {["name", "grade", "failPercentage", "students", "semester"].map(
              (key) => (
                <button
                  key={key}
                  onClick={() => toggleSort(key as SortKey)}
                  className="rounded bg-gray-700 px-3 py-1 transition-colors duration-200 hover:bg-gray-600"
                >
                  {(() => {
                    switch (key) {
                      case "name":
                        return "Fagkode";
                      case "grade":
                        return gradeTypeLabels[gradeType];
                      case "failPercentage":
                        return "Stryk %";
                      case "students":
                        return "Studenter";
                      case "semester":
                        return "Semester";
                      default:
                        return key;
                    }
                  })()}
                  {sortKey === key && (sortDirection === "asc" ? " ↑" : " ↓")}
                </button>
              ),
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="col-span-full text-center text-gray-400">
              Ingen kurs funnet med de valgte filtrene.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
