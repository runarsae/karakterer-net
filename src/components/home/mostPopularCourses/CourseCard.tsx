import Link from "next/link";

interface MoreInfoProps {
  avgGrade: number;
  medianGrade: number;
  modeGrade: number;
  failPercentage: number;
  students: number;
  semester: string;
}

interface CourseCardProps {
  code: string;
  name: string | null;
  moreInfo?: MoreInfoProps;
}

export default function CourseCard({ code, name, moreInfo }: CourseCardProps) {
  return (
    <Link href={`/courses/${code}`}>
      <div className="card rounded-lg bg-gray-800 p-4 shadow-md transition-colors hover:bg-neutral-900">
        <h2 className="text-lg font-semibold text-blue-400">{code}</h2>
        <p className="mb-2 text-neutral-300">{name}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-gray-200">Snittkarakter:</div>
          <div className="font-medium text-gray-300">
            {moreInfo?.avgGrade.toFixed(2)}
          </div>
          <div className="text-gray-100">Stryk %:</div>
          <div className="font-medium text-gray-300">
            {moreInfo?.failPercentage.toFixed(2)}%
          </div>
          <div className="text-gray-100">Studenter:</div>
          <div className="font-medium text-gray-300">{moreInfo?.students}</div>
          <div className="text-gray-100">Semester:</div>
          <div className="font-medium text-gray-300">{moreInfo?.semester}</div>
        </div>
      </div>
    </Link>
  );
}
