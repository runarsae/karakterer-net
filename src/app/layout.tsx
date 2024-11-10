import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "@/assets/globals.css";
import { SWRProvider } from "@/lib/swr/SWRProvider";
import { ChartJSProvider } from "@/lib/chartjs/ChartJSProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | karakterer.net",
    default: "karakterer.net",
  },
  description:
    "Detaljert og oppdatert karakterstatistikk for alle emner på Norges teknisk-naturvitenskapelige universitet (NTNU) siden 2004. Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent.",
  applicationName: "karakterer.net",
  keywords: [
    "karakterstatistikk",
    "NTNU",
    "karakterer",
    "karakterfordeling",
    "statistikk",
    "gjenommsnitt",
    "gjennomsnittskarakter",
    "strykprosent",
    "eksamen",
    "emne",
    "vurdering",
    "universitet",
    "utdanning",
    "grades",
  ],
  authors: [{ name: "runarsae", url: "https://github.com/runarsae" }],
};

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="no"
      className={`h-full w-full ${raleway.className} lining-nums`}
    >
      <body className="h-full w-full overflow-y-auto overflow-x-hidden bg-black text-neutral-400 [scrollbar-gutter:stable] *:box-border">
        <div className="flex flex-col gap-8 px-4 py-8 md:px-8 md:py-16">
          <SWRProvider>
            <ChartJSProvider>{children}</ChartJSProvider>
          </SWRProvider>
        </div>
      </body>
    </html>
  );
}
