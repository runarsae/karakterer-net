import GitHubIcon from "@/assets/icons/GitHubIcon";
import { IconLink } from "../common/IconLink";
import Section from "../common/Section";

interface FooterProps {
  alignLg?: "left" | "center" | "right";
}

export default function Footer({ alignLg = "right" }: FooterProps) {
  return (
    <Section>
      <div
        className={`flex items-center justify-center gap-4 text-sm text-neutral-600 ${alignLg === "left" && "lg:justify-start"} ${alignLg === "right" && "lg:justify-end"}`}
      >
        <p>Copyright © {new Date().getFullYear()} karakterer.net</p>
        <div className="h-4 w-0 border-r border-r-neutral-700" />
        <IconLink
          label="GitHub repository"
          icon={<GitHubIcon width={16} height={16} />}
          href="https://github.com/runarsae/karakterer-net"
          target="_blank"
          width={20}
          height={20}
        />
      </div>
    </Section>
  );
}
