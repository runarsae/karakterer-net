import Link from "next/link";

interface SearchResultProps {
  code: string;
  name: string | null;
}

export default function SearchResult({ code, name }: SearchResultProps) {
  return (
    <Link href={`/courses/${code}`}>
      <div className="card hover:bg-neutral-850 bg-neutral-900 transition-colors">
        <p className="text-sm">{code}</p>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-neutral-300">
          {name}
        </p>
      </div>
    </Link>
  );
}
