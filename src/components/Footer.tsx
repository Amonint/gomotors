"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { FaLinkedin, FaInstagramSquare, FaMapMarkerAlt, FaFacebookSquare } from "react-icons/fa";

// Add proper Google Maps type declarations
declare global {
  interface Window {
    initMap: () => void;
    google: {
      maps: {
        Map: any;
        Marker: any;
        LatLng: any;
        Size: any;
        Point: any;
        MapTypeControlStyle: any;
        ControlPosition: any;
      };
    };
  }
}

export const Footer = () => {
  const hyundaiMapRef = useRef<HTMLDivElement>(null);
  const multimarcaMapRef = useRef<HTMLDivElement>(null);
  const yantzazaMapRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const loadGoogleMaps = () => {
      if (
        (hyundaiMapRef.current || multimarcaMapRef.current || yantzazaMapRef.current) &&
        typeof window !== "undefined"
      ) {
        // Verificar si el script ya está cargado
        if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
          if (window.google && window.google.maps) {
            initMap();
          }
          return;
        }

        // Si el script no está cargado, lo cargamos
        if (!scriptLoadedRef.current) {
          scriptLoadedRef.current = true;
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXbf0rbYvqOnl8untBA_-F7kFd2XBNQpY&callback=initMap`;
          script.async = true;
          script.defer = true;

          window.initMap = () => {
            initMap();
          };

          document.head.appendChild(script);
        }
      }
    };

    const initMap = () => {
      const hyundaiLocation = { lat: -3.977638239161408, lng: -79.20404956911804};
      const multimarcaLocation = { lat: -3.977603460086567, lng: -79.2266462593288};
      const yantzazaLocation = {
        lat: -3.7963305009051984,
        lng: -78.75708430350988,
      };

      const mapOptions = {
        zoom: 16,
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
      };

      if (hyundaiMapRef.current) {
        const hyundaiMap = new window.google.maps.Map(
          hyundaiMapRef.current,
          {
            ...mapOptions,
            center: hyundaiLocation,
          }
        );

        const hyundaiMarker = new window.google.maps.Marker({
          position: hyundaiLocation,
          map: hyundaiMap,
          title: "GoMotors-HYUNDAI"
        });

        hyundaiMarker.addListener("click", () => {
          window.open(`https://www.google.com/maps?q=${hyundaiLocation.lat},${hyundaiLocation.lng}`, "_blank");
        });
      }

      if (multimarcaMapRef.current) {
        const multimarcaMap = new window.google.maps.Map(
          multimarcaMapRef.current,
          {
            ...mapOptions,
            center: multimarcaLocation,
          }
        );

        const multimarcaMarker = new window.google.maps.Marker({
          position: multimarcaLocation,
          map: multimarcaMap,
          title: "GoMotors-Multimarca"
        });

        multimarcaMarker.addListener("click", () => {
          window.open(`https://www.google.com/maps?q=${multimarcaLocation.lat},${multimarcaLocation.lng}`, "_blank");
        });
      }

      if (yantzazaMapRef.current) {
        const yantzazaMap = new window.google.maps.Map(
          yantzazaMapRef.current,
          {
            ...mapOptions,
            center: yantzazaLocation,
          }
        );

        const yantzazaMarker = new window.google.maps.Marker({
          position: yantzazaLocation,
          map: yantzazaMap,
          title: "GoMotors-Yantzaza"
        });

        yantzazaMarker.addListener("click", () => {
          window.open(`https://www.google.com/maps?q=${yantzazaLocation.lat},${yantzazaLocation.lng}`, "_blank");
        });
      }
    };

    loadGoogleMaps();
  }, []);

  return (
    <footer className="bg-[#0A0A0A] text-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        {/* Navegación principal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-24">
          {/* Columna 1 - Hyundai */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">
              HYUNDAI
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Ventas Hyundai
                </h4>
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-[#ffe600] mt-1" />
                  <p className="text-gray-300 text-sm">
                    Av. 8 de Diciembre e Isidro Ayora, frente al Terminal
                    Terrestre
                  </p>
                </div>
                <div
                  ref={hyundaiMapRef}
                  className="w-full h-[200px] mt-2"
                ></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Posventa Hyundai
                </h4>
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-[#ffe600] mt-1" />
                  <p className="text-gray-300 text-sm">
                    Av. 8 de Diciembre e Isidro Ayora, entrada por calle Machala
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 2 - Multimarca */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">
              MULTIMARCA
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Ventas Multimarca
                </h4>
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-[#ffe600] mt-1" />
                  <p className="text-gray-300 text-sm">
                    Sector Belén Km 2 Vía a Catamayo
                  </p>
                </div>
                <div
                  ref={multimarcaMapRef}
                  className="w-full h-[200px] mt-2"
                ></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Posventa Multimarca
                </h4>
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-[#ffe600] mt-1" />
                  <p className="text-gray-300 text-sm">
                    Sector Belén Km 2 Vía a Catamayo
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Columna 3 - Yantzaza */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">
              YANTZAZA
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Ventas Yantzaza
                </h4>
                <div className="flex items-start space-x-2">
                  <FaMapMarkerAlt className="text-[#ffe600] mt-1" />
                  <p className="text-gray-300 text-sm">
                    Vía a el Pangui, junto a IASA
                  </p>
                </div>
                <div
                  ref={yantzazaMapRef}
                  className="w-full h-[200px] mt-2"
                ></div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Título Get In Touch y línea separadora */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Contáctanos
          </h2>
          <div className="h-px w-full bg-gray-800"></div>
        </div>

        {/* Información de contacto y redes sociales */}
        <div className="flex flex-col md:flex-row justify-between mb-14 md:mb-28">
          {/* Información de contacto */}
          <div className="text-left space-y-3 mb-5 md:mb-0">
            <p className="text-white text-base">099-945-4243</p>
            <p className="text-white text-base">
              recepcionloja@gomotors.com.ec
            </p>
            <p className="text-white text-base">Loja, Ecuador</p>
          </div>

          {/* Redes sociales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* GOmotors Hyundai */}
            <div className="space-y-2">
              <h4 className="text-white text-sm font-medium">GOmotors Hyundai</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/gomotors_hyundai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Hyundai"
                >
                  <FaInstagramSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/gomotorshyundai1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Hyundai"
                >
                  <FaFacebookSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
              </div>
            </div>

            {/* GOmotors Multimarcas */}
            <div className="space-y-2">
              <h4 className="text-white text-sm font-medium">GOmotors Multimarcas</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/gomotors_greatwall/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Multimarcas"
                >
                  <FaInstagramSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/IOmotorsGreatWall"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Multimarcas"
                >
                  <FaFacebookSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
              </div>
            </div>

            {/* GOmotors Yantzaza */}
            <div className="space-y-2">
              <h4 className="text-white text-sm font-medium">GOmotors Yantzaza</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/gomotors_yantzaza/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Yantzaza"
                >
                  <FaInstagramSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/gomotorsyantzaza"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Yantzaza"
                >
                  <FaFacebookSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
              </div>
            </div>

            {/* GOmotors Multimarcas Posventa */}
            <div className="space-y-2">
              <h4 className="text-white text-sm font-medium">Posventa Multimarcas</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/gomotors_multimarcas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Posventa"
                >
                  <FaInstagramSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/tmgomotors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Posventa"
                >
                  <FaFacebookSquare className="w-6 h-6 text-[#FFFF] hover:text-gray-300 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Información legal */}
        <div className="pt-6 mb-3">
          <p className="text-xs text-gray-400 mb-3">
            &copy; 2024 GoMotors. Todos los derechos reservados.
          </p>

          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 text-xs text-gray-400">
            <div className="flex space-x-5">
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
