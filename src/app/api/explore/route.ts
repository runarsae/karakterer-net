import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const sortKey = (searchParams.get("sortKey") as SortKey) || "name";
    const sortDirection =
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

    const whereClause: Prisma.CourseWhereInput = {
      hasGrades: true,
      OR: [
        {
          code: {
            contains: search,
          },
        },
        {
          name: {
            contains: search,
          },
        },
      ],
      grades: {
        some: {
          isGraded: true,
          ...(lowFailRate && { failPercentage: { lt: 15 } }),
          ...(highGrade && { [mapGradeType(gradeType)]: { gte: 4.0 } }),
          ...(largeCourse && { students: { gte: 100 } }),
          ...(semester !== undefined && { semester }),
        },
      },
    };

    let orderBy: Prisma.CourseOrderByWithRelationInput = {};

    if (sortKey === "grade") {
      orderBy = {
        grades: {
          [mapGradeType(gradeType)]: sortDirection,
        },
      };
    } else {
      orderBy = {
        [sortKey]: sortDirection,
      };
    }

    const courses = await prisma.course.findMany({
      where: whereClause,
      orderBy: orderBy,
      include: {
        grades: {
          select: {
            averageGrade: true,
            failPercentage: true,
            students: true,
            semester: true,
          },
          where: {
            isGraded: true,
          },
          orderBy: {
            year: "desc",
            semester: "desc",
          },
          take: 1,
        },
      },
    });

    const mappedCourses = courses.map((course) => {
      const grade = course.grades[0];
      return {
        id: course.id,
        code: course.code,
        name: course.name,
        avgGrade: grade?.averageGrade || 0,
        medianGrade: 0,
        modeGrade: 0,
        failPercentage: grade?.failPercentage || 0,
        students: grade?.students || 0,
        semester: grade?.semester || 0,
      };
    });

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

type SortKey = "name" | "grade" | "failPercentage" | "students" | "semester";
type GradeType = "avgGrade" | "medianGrade" | "modeGrade";

function mapGradeType(
  gradeType: GradeType,
): keyof Prisma.GradeOrderByWithRelationInput {
  switch (gradeType) {
    case "avgGrade":
      return "averageGrade";
    case "medianGrade":
      return "averageGrade";
    case "modeGrade":
      return "averageGrade";
    default:
      return "averageGrade";
  }
}
