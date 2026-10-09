import { Cursor } from "@/components/site/Cursor";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Preloader } from "@/components/site/Preloader";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { getSettings } from "@/lib/data";
import { introScript } from "@/lib/intro";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <div className="grain">
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <Preloader tagline={settings.preloader_tagline || undefined} />
      <SmoothScroll />
      <Cursor />
      <Navbar email={settings.email} address={settings.address} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
