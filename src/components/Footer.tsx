"use client";

import Link from "next/link";

import { FaLinkedin, FaInstagram, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
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

 

  // Editorial-style contact section with maps
  return (
    <footer className="bg-neutral-100 text-neutral-800 pt-16 pb-8 antialiased" style={{ fontFamily: 'Montserrat-Arabic, sans-serif' }}>
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo and Description */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <span className="text-2xl font-medium text-neutral-800">GoMotors</span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-700 mb-6">
              Concesionario y taller multimarca en Loja, Ecuador. Ofrecemos vehículos nuevos y usados, repuestos originales y servicio técnico especializado.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="w-5 h-5 text-neutral-600 hover:text-neutral-900 transition-colors duration-200" />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="w-5 h-5 text-neutral-600 hover:text-neutral-900 transition-colors duration-200" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Information */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-neutral-900 mb-6">Contáctanos</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaPhoneAlt className="w-4 h-4 text-neutral-600 mr-3 mt-1" />
                <p className="text-sm text-neutral-700">099-945-4243</p>
              </div>
              <div className="flex items-start">
                <FaEnvelope className="w-4 h-4 text-neutral-600 mr-3 mt-1" />
                <p className="text-sm text-neutral-700">recepcionloja@gomotors.com.ec</p>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-4 h-4 text-neutral-600 mr-3 mt-1" />
                <p className="text-sm text-neutral-700">
                  Av. 8 de Diciembre e Isidro Ayora, frente al Terminal Terrestre, Loja.
                </p>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-4 h-4 text-neutral-600 mr-3 mt-1" />
                <p className="text-sm text-neutral-700">
                  Sector Belén Km 2 Vía a Catamayo, Loja.
                </p>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-neutral-900 mb-6">Explora</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/showroom" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200">
                  Showroom
                </Link>
              </li>
              <li>
                <Link href="/postventa" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200">
                  Posventa
                </Link>
              </li>
              <li>
                <Link href="/referente-go" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200">
                  Referente Go
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors duration-200">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Maps */}
          <div className="col-span-1">
            <h4 className="text-base font-semibold text-neutral-900 mb-6">Ubicaciones</h4>
            <div className="space-y-6">
              {/* Hyundai Map Placeholder */}
              <div ref={hyundaiMapRef} className="w-full h-32 bg-neutral-200 rounded-md overflow-hidden shadow-inner">
                {/* This div will be replaced by the Google Map */}
              </div>
              {/* Multimarca Map Placeholder */}
              <div ref={multimarcaMapRef} className="w-full h-32 bg-neutral-200 rounded-md overflow-hidden shadow-inner">
                {/* This div will be replaced by the Google Map */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright and Legal Links */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 mt-12 border-t border-neutral-300 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-700">
          <p className="mb-4 md:mb-0">&copy; 2024 GoMotors. Todos los derechos reservados.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-neutral-900 transition-colors duration-200">
              Términos y Condiciones
            </Link>
            <Link href="/privacy" className="hover:text-neutral-900 transition-colors duration-200">
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
