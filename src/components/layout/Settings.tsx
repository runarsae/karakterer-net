import { forwardRef } from "react";
import { AnimatePresence } from "motion/react";
import Fade from "@/components/common/animation/Fade";
import SemesterTypeSelect from "../courses/SemesterTypeSelect";

interface SettingsProps {
  open: boolean;
}

export type Ref = HTMLDivElement;

const Settings = forwardRef<Ref, SettingsProps>(function Settings(
  { open },
  ref,
) {
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute top-[45px] right-0 z-10 w-max">
          <Fade>
            <div ref={ref} className="card bg-neutral-900">
              <SemesterTypeSelect />
            </div>
          </Fade>
        </div>
      )}
    </AnimatePresence>
  );
});

export default Settings;
