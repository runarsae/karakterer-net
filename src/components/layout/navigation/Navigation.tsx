import InfoIcon from "@/assets/icons/InfoIcon";
import { IconLink } from "../../common/IconLink";
import SearchNavButton from "./SearchNavButton";
import SettingsNavButton from "./SettingsNavButton";
import ExploreIcon from "@/assets/icons/ExploreIcon";

interface NavigationProps {
  settings?: boolean;
}

export default function Navigation({ settings }: NavigationProps) {
  return (
    <>
      <nav className="relative flex flex-row items-center justify-end gap-2">
        <SearchNavButton />
        <IconLink label="Om karakterer.net" href="/about" icon={<InfoIcon />} />

        {settings && <SettingsNavButton />}
        <IconLink label="Utforsk" href="/explore" icon={<ExploreIcon />} />
      </nav>
    </>
  );
}
