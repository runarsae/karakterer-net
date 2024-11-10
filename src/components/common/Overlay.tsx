interface OverlayProps {
  onClose?: () => void;
}

export default function Overlay({ onClose }: OverlayProps) {
  return (
    <div
      className="fixed left-0 top-0 z-20 block h-full w-full bg-black bg-opacity-70"
      onClick={onClose}
    ></div>
  );
}
