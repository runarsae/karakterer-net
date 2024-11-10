import prisma from "@/lib/prisma/prisma";
import Section from "@/components/common/Section";
import CourseCard from "./CourseCard";
import Content from "@/components/common/Content";
import { unstable_cache } from "next/cache";

const getMostPopularCourses = unstable_cache(
  async () => {
    return await prisma.topCourseView.findMany({
      orderBy: { viewCount: "desc" },
      select: { courseCode: true, courseName: true },
      take: 8,
    });
  },
  ["mostPopularCourses"],
  { revalidate: 60 * 60 * 24, tags: ["mostPopularCourses"] },
);

export default async function MostPopularCourses() {
  const mostPopularCourses = await getMostPopularCourses();

  if (!mostPopularCourses) {
    return null;
  }

  return (
    <Section>
      <Content>
        <h1>Mest populære emner</h1>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {mostPopularCourses.map((course) => (
            <CourseCard
              key={course.courseCode}
              code={course.courseCode}
              name={course.courseName}
            />
          ))}
        </div>
      </Content>
    </Section>
  );
}
