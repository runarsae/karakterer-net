import { SemesterTypeContextProvider } from "@/components/courses/SemesterTypeContextProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import prisma from "@/lib/prisma/prisma";
import { notFound } from "next/navigation";

interface CourseLayoutProps {
  children: React.ReactNode;
  params: {
    code?: string;
  };
}

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
  const { code } = params;

  if (!code) {
    notFound();
  }

  const decodedCode = decodeURIComponent(code);

  const course = await prisma.course.findUnique({
    where: { code: decodedCode },
    include: { grades: true },
  });

  if (!course || !course.hasGrades) {
    notFound();
  }

  return (
    <SemesterTypeContextProvider grades={course.grades}>
      <Header title={`${course.code} ${course.name}`} settings />
      {children}
      <Footer />
    </SemesterTypeContextProvider>
  );
}
