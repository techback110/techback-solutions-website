import { Cursor } from "@/components/site/Cursor";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Preloader } from "@/components/site/Preloader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { introScript } from "@/lib/intro";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grain">
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
