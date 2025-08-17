import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/courses/[code]", "layout");
  revalidatePath("/courses/[code]", "page");
  revalidateTag("mostPopularCourses");
  revalidateTag("course");

  return NextResponse.json({ message: "Revalidation succeeded" });
}
