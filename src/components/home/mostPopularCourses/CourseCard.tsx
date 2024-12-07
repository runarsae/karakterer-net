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
        <div className="text-sm text-neutral-400">
          <p>Gjennomsnittskarakter: {moreInfo?.avgGrade.toFixed(1)}</p>
          <p>Mediankarakter: {moreInfo?.avgGrade.toFixed(1)}</p>
          <p>Mode karakter: {moreInfo?.modeGrade}</p>
          <p>Strykprosent: {moreInfo?.failPercentage}%</p>
          <p>Antall studenter: {moreInfo?.students}</p>
          <p>Semester: {moreInfo?.semester}</p>
        </div>
      </div>
    </Link>
  );
}
