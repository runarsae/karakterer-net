import GitHubIcon from "@/assets/icons/GitHubIcon";
import { IconLink } from "../common/IconLink";
import Section from "../common/Section";

interface FooterProps {
  alignLg?: "left" | "center" | "right";
}

export default function Footer({ alignLg = "right" }: FooterProps) {
  const version = process.env.NEXT_PUBLIC_VERSION || "v0.0.0";

  return (
    <Section>
      <div
        className={`flex items-center justify-center gap-4 text-sm text-neutral-500 ${alignLg === "left" && "lg:justify-start"} ${alignLg === "right" && "lg:justify-end"}`}
      >
        <p>Copyright © {new Date().getFullYear()} karakterer.net</p>
        <Divider />
        <p>{version}</p>
        <Divider />
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

function Divider() {
  return <div className="h-3 w-0 border-r border-r-neutral-700" />;
}
