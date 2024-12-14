import prisma from "@/lib/prisma/prisma";
import Dashboard from "@/components/courses/Dashboard";
import { notFound } from "next/navigation";
import Section from "@/components/common/Section";
import { unstable_cache } from "next/cache";
import CourseViewTracker from "@/components/courses/CourseViewTracker";

const getCourse = unstable_cache(
  async (code: string) => {
    return await prisma.course.findUnique({
      where: { code: code },
      include: { grades: true },
    });
  },
  ["course"],
  { revalidate: 60 * 60 * 24, tags: ["course"] },
);

interface CourseProps {
  params: {
    code: string;
  };
}

export async function generateMetadata({ params }: CourseProps) {
  const { code } = params;
  const decodedCode = decodeURIComponent(code);

  const course = await getCourse(decodedCode);

  if (!course || !course.hasGrades) {
    notFound();
  }

  return {
    title: `${course.code} ${course.name}`,
  };
}

export async function generateStaticParams() {
  const grades = await prisma.grade.findMany({
    where: {
      year: {
        gte: new Date().getFullYear() - 3,
      },
    },
    orderBy: {
      students: "desc",
    },
    select: {
      course: {
        select: {
          code: true,
        },
      },
    },
    distinct: ["courseId"],
    take: 100,
  });

  return grades.map((grade) => ({
    code: grade.course.code,
  }));
}

export default async function Course({ params }: CourseProps) {
  const { code } = params;
  const decodedCode = decodeURIComponent(code);

  const course = await getCourse(decodedCode);

  if (!course || !course.hasGrades) {
    notFound();
  }

  return (
    <>
      <CourseViewTracker courseId={course.id} />
      <Section>
        <Dashboard course={course} />
      </Section>
    </>
  );
}
