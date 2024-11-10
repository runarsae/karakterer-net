import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import logoText from "@/assets/logo-text.svg";
import Navigation from "./navigation/Navigation";
import Section from "../common/Section";

interface HeaderProps {
  title?: string;
  settings?: boolean;
}

export default function Header({ title, settings }: HeaderProps) {
  return (
    <Section>
      <div className="flex w-full items-center justify-between gap-8">
        <div className="flex gap-4">
          <div className="shrink-0 select-none">
            <Link href="/">
              <div className="flex items-center gap-3">
                <div className="h-[28px] w-[28px] shrink-0">
                  <Image
                    src={logo}
                    alt="Logo"
                    width={28}
                    height={28}
                    quality={100}
                    priority
                  />
                </div>
                <div className="hidden shrink-0 min-[420px]:block">
                  <Image
                    src={logoText}
                    alt="karakterer.net"
                    width={136}
                    quality={100}
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>
          {title && (
            <div className="hidden min-w-0 items-center gap-4 md:flex">
              <div className="h-5 w-0 border-r border-r-neutral-700"></div>
              <h1 className="overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </h1>
            </div>
          )}
        </div>
        <Navigation settings={settings} />
      </div>
    </Section>
  );
}
