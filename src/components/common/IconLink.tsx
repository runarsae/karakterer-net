interface IconLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  target?: string;
  width?: number;
  height?: number;
}

export function IconLink({
  icon,
  label,
  href,
  target,
  width = 42,
  height = 42,
}: IconLinkProps) {
  return (
    <a
      title={label}
      href={href}
      className={`flex items-center justify-center transition-colors hover:text-neutral-300`}
      style={{ width: width, height: height }}
      target={target}
    >
      {icon}
    </a>
  );
}
