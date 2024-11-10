interface Props {
  error: string;
}

export default function SearchError({ error }: Props) {
  return <p className="pb-4 text-sm text-[#b13f3f]">{error}</p>;
}
