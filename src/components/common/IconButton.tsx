interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export function IconButton({ icon, label, onClick }: IconButtonProps) {
  return (
    <button
      title={label}
      onClick={onClick}
      className={`flex h-[42px] w-[42px] items-center justify-center transition-colors hover:text-neutral-300`}
    >
      {icon}
    </button>
  );
}
