import { NextResponse, type NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma/prisma";

export async function GET(request: NextRequest) {
  interface Course {
    id: number;
    code: string;
    name: string;
    avgGrade: number | null;
    failPercentage: number | null;
    students: number | null;
    semester: number | null;
  }

  type SortKey = "name" | "grade" | "failPercentage" | "students" | "semester";
  type GradeType = "avgGrade" | "medianGrade" | "modeGrade";

  function mapGradeType(gradeType: GradeType): string {
    switch (gradeType) {
      case "avgGrade":
      case "medianGrade":
      case "modeGrade":
        return "average_grade";
      default:
        return "average_grade";
    }
  }

  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    let sortKey = (searchParams.get("sortKey") as SortKey) || "name";
    let sortDirection =
      (searchParams.get("sortDirection") as "asc" | "desc") || "asc";
    const gradeType =
      (searchParams.get("gradeType") as GradeType) || "avgGrade";
    const lowFailRate = searchParams.get("lowFailRate") === "true";
    const highGrade = searchParams.get("highGrade") === "true";
    const largeCourse = searchParams.get("largeCourse") === "true";
    const semesterParam =
      (searchParams.get("semester") as "all" | "høst" | "vår") || "all";

    let semester: number | undefined;
    if (semesterParam === "høst") semester = 1;
    else if (semesterParam === "vår") semester = 2;

    const gradeColumn = mapGradeType(gradeType);

    const gradeConditions: string[] = ["g.is_graded = 1"];
    if (lowFailRate) {
      gradeConditions.push("g.fail_percentage < 15");
      sortKey = "grade";
    }
    if (highGrade) {
      gradeConditions.push(`g.${gradeColumn} >= 4.0`);
      sortKey = "grade";
      sortDirection = "desc";
    }
    if (largeCourse) {
      gradeConditions.push("g.students >= 100");
      sortKey = "students";
      sortDirection = "desc";
    }
    if (semester !== undefined) {
      gradeConditions.push(`g.semester = ${semester}`);
    }

    const gradeWhere =
      gradeConditions.length > 1
        ? "AND " + gradeConditions.slice(1).join(" AND ")
        : "";

    let orderColumn = "c.name";
    switch (sortKey) {
      case "grade":
        orderColumn = "avgGrade";
        break;
      case "failPercentage":
        orderColumn = "failPercentage";
        break;
      case "students":
        orderColumn = "students";
        break;
      case "semester":
        orderColumn = "semester";
        break;
      case "name":
      default:
        orderColumn = "c.name";
        break;
    }

    const courses = await prisma.$queryRaw<Course[]>`
      SELECT
        c.id,
        c.code,
        c.name,
        (
          SELECT g.${Prisma.raw(gradeColumn)}
          FROM grades g
          WHERE g.course_id = c.id
            AND g.is_graded = 1
            ${Prisma.raw(gradeWhere)}
          ORDER BY g.year DESC, g.semester DESC
          LIMIT 1
        ) AS avgGrade,
        (
          SELECT g.fail_percentage
          FROM grades g
          WHERE g.course_id = c.id
            AND g.is_graded = 1
            ${Prisma.raw(gradeWhere)}
          ORDER BY g.year DESC, g.semester DESC
          LIMIT 1
        ) AS failPercentage,
        (
          SELECT g.students
          FROM grades g
          WHERE g.course_id = c.id
            AND g.is_graded = 1
            ${Prisma.raw(gradeWhere)}
          ORDER BY g.year DESC, g.semester DESC
          LIMIT 1
        ) AS students,
        (
          SELECT g.semester
          FROM grades g
          WHERE g.course_id = c.id
            AND g.is_graded = 1
            ${Prisma.raw(gradeWhere)}
          ORDER BY g.year DESC, g.semester DESC
          LIMIT 1
        ) AS semester
      FROM courses c
      WHERE c.has_grades = 1
        AND (c.code LIKE CONCAT('%', ${search}, '%') OR c.name LIKE CONCAT('%', ${search}, '%'))
      ORDER BY ${Prisma.raw(orderColumn)} ${Prisma.raw(sortDirection.toUpperCase())};
    `;

    const mappedCourses = courses.map((course) => ({
      id: course.id,
      code: course.code,
      name: course.name,
      avgGrade: course.avgGrade || 0,
      medianGrade: 0,
      modeGrade: 0,
      failPercentage: course.failPercentage || 0,
      students: course.students || 0,
      semester: course.semester || 0,
    }));

    return NextResponse.json(mappedCourses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "production"
            ? "Internal Server Error"
            : (error as Error).message,
      },
      { status: 500 },
    );
  }
}
