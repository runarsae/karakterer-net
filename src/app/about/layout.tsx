import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer alignLg="center" />
    </>
  );
}
