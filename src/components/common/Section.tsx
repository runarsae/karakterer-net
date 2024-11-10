interface SectionProps {
  children: React.ReactNode;
  size?: "md" | "2xl";
}

export default function Section({ children, size = "2xl" }: SectionProps) {
  return (
    <section
      className={`m-auto w-full ${size === "md" ? "max-w-screen-md" : "max-w-screen-2xl"}`}
    >
      {children}
    </section>
  );
}
