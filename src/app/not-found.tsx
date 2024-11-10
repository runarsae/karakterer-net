import Section from "@/components/common/Section";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <Section size="md">
        <div className="md:py-16">
          <div className="card flex w-full flex-col gap-4">
            <h1>Ooops... 404 error</h1>
            <p>Den forespurte siden ble ikke funnet.</p>
          </div>
        </div>
      </Section>
      <Footer alignLg="center" />
    </>
  );
}
