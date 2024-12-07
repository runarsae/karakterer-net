import { NextResponse, type NextRequest } from "next/server";
import prisma from "@/lib/prisma/prisma";

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
    const semester =
      (searchParams.get("semester") as "all" | "høst" | "vår") || "all";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {
      hasGrades: true,
      OR: [
        {
          code: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
    if (lowFailRate) {
      whereClause.failPercentage = {
        lt: 15,
      };
    }

    if (highGrade) {
      whereClause[gradeType] = {
        gte: 4.0,
      };
    }

    if (largeCourse) {
      whereClause.students = {
        gte: 100,
      };
    }

    if (semester !== "all") {
      whereClause.semester = semester;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = {};

    if (sortKey === "grade") {
      orderBy = {
        [gradeType]: sortDirection,
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
        medianGrade: grade?.averageGrade || 0,
        modeGrade: 0,
        failPercentage: grade?.failPercentage || 0,
        students: grade?.students || 0,
        semester: grade?.semester || "",
      };
    });

    return NextResponse.json(mappedCourses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

type SortKey = "name" | "grade" | "failPercentage" | "students" | "semester";
type GradeType = "avgGrade" | "medianGrade" | "modeGrade";
