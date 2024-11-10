interface CourseHeaderProps {
  code: string;
  name: string | null;
}

export default function CourseHeader({ code, name }: CourseHeaderProps) {
  return (
    <div className="card md:hidden">
      <p className="text-sm">{code}</p>
      <h1 className="overflow-hidden text-ellipsis whitespace-nowrap text-lg">
        {name}
      </h1>
    </div>
  );
}
