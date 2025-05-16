"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaTools } from "react-icons/fa";
import { useEffect, useRef } from "react";

// Add proper Google Maps type declarations at the top
declare global {
  interface Window {
    initMap: () => void;
    google: {
      maps: {
        Map: any;
        Marker: any;
        LatLng: any;
        Size: any;
        MapTypeControlStyle: any;
        ControlPosition: any;
      }
    };
  }
}

export const Footer = () => {
  const hyundaiMapRef = useRef<HTMLDivElement>(null);
  const multimarcaMapRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    // Only load map once
    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadGoogleMaps = () => {
      if ((hyundaiMapRef.current || multimarcaMapRef.current) && typeof window !== 'undefined') {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXbf0rbYvqOnl8untBA_-F7kFd2XBNQpY&callback=initMap`;
        script.async = true;
        script.defer = true;

        window.initMap = () => {
          const hyundaiLocation = { lat: -3.9913, lng: -79.2042 }; // 2QCW+V78
          const multimarcaLocation = { lat: -3.9973, lng: -79.2131 }; // 2QCF+W83
          
          // Common map options with minimal controls
          const mapOptions = {
            zoom: 16,
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            fullscreenControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_BOTTOM
            },
            styles: [
              { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
              { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
              { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
              { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
              { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
              { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
              { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
              { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
              { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
              { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
              { featureType: "water", elementType: "geometry", stylers: [{ color: "#e9e9e9" }] },
              { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
            ]
          };

          // Create Hyundai map
          if (hyundaiMapRef.current) {
            const hyundaiMap = new window.google.maps.Map(hyundaiMapRef.current, {
              ...mapOptions,
              center: hyundaiLocation,
            });

            // Hyundai Marker
            new window.google.maps.Marker({
              position: hyundaiLocation,
              map: hyundaiMap,
              title: "GoMotors-HYUNDAI",
              icon: {
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="#000000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
                scaledSize: new window.google.maps.Size(36, 36),
              },
            });
          }

          // Create Multimarca map
          if (multimarcaMapRef.current) {
            const multimarcaMap = new window.google.maps.Map(multimarcaMapRef.current, {
              ...mapOptions,
              center: multimarcaLocation,
            });

            // Multimarca Marker
            new window.google.maps.Marker({
              position: multimarcaLocation,
              map: multimarcaMap,
              title: "GoMotors-Multimarca",
              icon: {
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="#000000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'),
                scaledSize: new window.google.maps.Size(36, 36),
              },
            });
          }
        };

        document.head.appendChild(script);
      }
    };

    loadGoogleMaps();
  }, []);

  // Primary navigation section
  const Navigation = () => (
    <div className="bg-[#0A0A0A] py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-3 mb-12 md:mb-0">
            <Image 
              src="/images/logo.png" 
              alt="GoMotors Logo" 
              width={130} 
              height={55} 
              className="brightness-0 invert"
            />
          </div>

          <div className="col-span-6 md:col-span-3">
            <h3 className="font-normal text-xs uppercase tracking-widest text-white/60 mb-6">Navegación</h3>
            <ul className="space-y-4">
              <li><Link href="/about-us" className="text-white/80 hover:text-white text-sm tracking-wide">Sobre Nosotros</Link></li>
              <li><Link href="/showroom" className="text-white/80 hover:text-white text-sm tracking-wide">Showroom</Link></li>
              <li><Link href="/contact-us" className="text-white/80 hover:text-white text-sm tracking-wide">Contáctanos</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h3 className="font-normal text-xs uppercase tracking-widest text-white/60 mb-6">Vehículos</h3>
            <ul className="space-y-4">
              <li><Link href="/showroom/suv" className="text-white/80 hover:text-white text-sm tracking-wide">SUVs & Crossovers</Link></li>
              <li><Link href="/showroom/sedanes" className="text-white/80 hover:text-white text-sm tracking-wide">Sedanes</Link></li>
              <li><Link href="/showroom/deportivos" className="text-white/80 hover:text-white text-sm tracking-wide">Pick Ups</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 mt-12 md:mt-0">
            <h3 className="font-normal text-xs uppercase tracking-widest text-white/60 mb-6">Servicios</h3>
            <ul className="space-y-4">
              <li><Link href="/financing" className="text-white/80 hover:text-white text-sm tracking-wide">Financiamiento</Link></li>
              <li><Link href="/maintenance" className="text-white/80 hover:text-white text-sm tracking-wide">Mantenimiento</Link></li>
              <li><Link href="/insurance" className="text-white/80 hover:text-white text-sm tracking-wide">Seguros</Link></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 mt-12 md:mt-0">
            <h3 className="font-normal text-xs uppercase tracking-widest text-white/60 mb-6">Marcas</h3>
            <ul className="space-y-4">
              <li><Link href="/brands/hyundai" className="text-white/80 hover:text-white text-sm tracking-wide">Hyundai</Link></li>
              <li><Link href="/brands/great-wall" className="text-white/80 hover:text-white text-sm tracking-wide">Great Wall</Link></li>
              <li><Link href="/brands/swm" className="text-white/80 hover:text-white text-sm tracking-wide">SWM</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  // Editorial-style contact section with maps
  const LocationsSection = () => (
    <section className="bg-white py-20 md:py-32" style={{ fontFamily: 'Inter, Helvetica, sans-serif' }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          {/* Section heading with editorial style */}
          <div className="col-span-12 mb-1">
            <h2 className="text-4xl md:text-6xl font-light tracking-tight pb-6 mb-0 border-b border-neutral-200 text-neutral-700">
              Sucursales y Contacto
            </h2>
          </div>

          {/* Hyundai Column */}
          <div className="col-span-12 md:col-span-6 pr-0 md:pr-12 lg:pr-20">
            <div className="mb-20">
              <h3 className="text-xs font-medium tracking-widest uppercase text-neutral-500 mb-10">Hyundai</h3>
              
              {/* Map container */}
              <div className="mb-14">
                <div ref={hyundaiMapRef} className="w-full aspect-[4/3] bg-neutral-100"></div>
                <p className="text-xs text-neutral-500 mt-2">2QCW+V78, Loja (GoMotors-HYUNDAI)</p>
              </div>

              {/* VENTAS HYUNDAI */}
              <div className="mb-14">
                <h4 className="text-xl font-normal mb-5 text-neutral-700">VENTAS HYUNDAI</h4>
                <div className="grid grid-cols-12 gap-x-4">
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaMapMarkerAlt className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm leading-relaxed mb-3 text-neutral-600">
                    Av. 8 de Diciembre e Isidro Ayora, frente al Terminal Terrestre
                  </div>
                  
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaPhoneAlt className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm mb-3 text-neutral-600">
                    099-945-4243
                  </div>
                  
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaEnvelope className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm text-neutral-600">
                    recepcionloja@gomotors.com.ec
                  </div>
                </div>
              </div>

              {/* POSVENTA HYUNDAI */}
              <div>
                <h4 className="text-xl font-normal mb-5 text-neutral-700">POSVENTA HYUNDAI</h4>
                <div className="grid grid-cols-12 gap-x-4">
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaMapMarkerAlt className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm leading-relaxed text-neutral-600">
                    Av. 8 de Diciembre e Isidro Ayora, entrada por calle Machala
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Multimarca Column */}
          <div className="col-span-12 md:col-span-6 pl-0 md:pl-8 lg:pl-12">
            <div className="mb-20">
              <h3 className="text-xs font-medium tracking-widest uppercase text-neutral-500 mb-10">Multimarca</h3>
              
              {/* Map container */}
              <div className="mb-14">
                <div ref={multimarcaMapRef} className="w-full aspect-[4/3] bg-neutral-100"></div>
                <p className="text-xs text-neutral-500 mt-2">2QCF+W83, Loja (GoMotors-Multimarca)</p>
              </div>

              {/* VENTAS MULTIMARCAS */}
              <div className="mb-14">
                <h4 className="text-xl font-normal mb-5 text-neutral-700">VENTAS MULTIMARCAS</h4>
                <div className="grid grid-cols-12 gap-x-4">
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaMapMarkerAlt className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm leading-relaxed mb-3 text-neutral-600">
                    Sector Belén Km 2 Vía a Catamayo
                  </div>
                  
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaPhoneAlt className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm mb-3 text-neutral-600">
                    099-945-4243
                  </div>
                  
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaEnvelope className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm text-neutral-600">
                    recepcionloja@gomotors.com.ec
                  </div>
                </div>
              </div>

              {/* POSVENTA MULTIMARCAS */}
              <div>
                <h4 className="text-xl font-normal mb-5 text-neutral-700">POSVENTA MULTIMARCAS</h4>
                <div className="grid grid-cols-12 gap-x-4">
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaMapMarkerAlt className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm leading-relaxed mb-3 text-neutral-600">
                    Sector Belén Km 2 Vía a Catamayo
                  </div>
                  
                  <div className="col-span-1 flex justify-end pt-1">
                    <FaPhoneAlt className="text-neutral-400" />
                  </div>
                  <div className="col-span-11 text-sm text-neutral-600">
                    099-945-4243
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );

  // Legal and social section
  const LegalSection = () => (
    <div className="bg-neutral-100 py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-4 mb-6 md:mb-0">
            <p className="text-xs text-neutral-500">&copy; 2024 GoMotors. Todos los derechos reservados.</p>
          </div>
          
          <div className="col-span-12 md:col-span-4 mb-6 md:mb-0 md:text-center">
            <div className="flex space-x-6 md:justify-center">
              <Link href="/terms" className="text-xs text-neutral-500 hover:text-neutral-800">Términos y Condiciones</Link>
              <Link href="/privacy" className="text-xs text-neutral-500 hover:text-neutral-800">Política de Privacidad</Link>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-4 flex justify-start md:justify-end space-x-4">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="w-4 h-4 text-neutral-400 hover:text-neutral-800" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-4 h-4 text-neutral-400 hover:text-neutral-800" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <footer className="antialiased">
      <Navigation />
      <LocationsSection />
      <LegalSection />
    </footer>
  );
};
