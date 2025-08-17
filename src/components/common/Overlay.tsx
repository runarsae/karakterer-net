interface OverlayProps {
  onClose?: () => void;
}

export default function Overlay({ onClose }: OverlayProps) {
  return (
    <div
      className="fixed top-0 left-0 z-20 block h-full w-full bg-black/80"
      onClick={onClose}
    ></div>
  );
}
