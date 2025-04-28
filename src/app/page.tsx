import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Showroom from '@/components/Showroom';
import Postventa from '@/components/Postventa';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <AboutUs />
      <Showroom />
      <Postventa />
      <Footer />
    </main>
  );
}
