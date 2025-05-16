import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Showroom from '@/components/Showroom';
import { Footer } from '@/components/Footer';
import ReferenteGo from '@/components/ReferenteGo';
import PostventaGo from '@/components/PostventaGO';

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <AboutUs />
      <Showroom />
      <ReferenteGo></ReferenteGo>
      <PostventaGo></PostventaGo>
      <Footer />
      
    </main>
  );
}
