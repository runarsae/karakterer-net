import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface ExploreLayoutProps {
  children: React.ReactNode;
}

export default function ExploreLayout({ children }: ExploreLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
