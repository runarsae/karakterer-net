import prisma from "@/lib/prisma/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  _request: NextRequest,
  props: { params: Promise<{ courseId?: string }> },
) {
  const params = await props.params;
  const courseIdParam = params.courseId;

  if (!courseIdParam) {
    return NextResponse.json({}, { status: 400 });
  }

  const courseId = parseInt(courseIdParam);

  if (isNaN(courseId)) {
    return NextResponse.json({}, { status: 400 });
  }

  try {
    await prisma.courseView.create({
      data: { courseId: courseId },
    });
    return NextResponse.json({}, { status: 201 });
  } catch (e) {
    console.log(e);

    return NextResponse.json({}, { status: 500 });
  }
}
