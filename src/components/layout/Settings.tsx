import { forwardRef } from "react";
import SemesterTypeSelect from "../courses/SemesterTypeSelect";

interface SettingsProps {
  open: boolean;
}

export type Ref = HTMLDivElement;

const Settings = forwardRef<Ref, SettingsProps>(function Settings(
  { open },
  ref,
) {
  if (!open) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="card absolute right-0 top-[45px] z-10 w-max bg-neutral-900"
    >
      <SemesterTypeSelect />
    </div>
  );
});

export default Settings;
