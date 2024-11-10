import Link from "next/link";

interface CourseCardProps {
  code: string;
  name: string | null;
}

export default function CourseCard({ code, name }: CourseCardProps) {
  return (
    <Link href={`/courses/${code}`}>
      <div className="card transition-colors hover:bg-neutral-900">
        <p className="text-sm">{code}</p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-300">
          {name}
        </p>
      </div>
    </Link>
  );
}
