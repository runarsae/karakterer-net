import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
