interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <div className="flex flex-col gap-4">{children}</div>;
}
