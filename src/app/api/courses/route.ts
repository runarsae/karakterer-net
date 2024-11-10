import prisma from "@/lib/prisma/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");

  if (!search) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    const courses = await prisma.course.findMany({
      where: {
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
      },
    });
    return NextResponse.json(courses, { status: 200 });
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
