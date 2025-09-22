"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";




// Add proper Google Maps type declarations
declare global {
  interface Window {
    initMap: () => void;
    google: {
      maps: {
        Map: new (element: HTMLElement, options: object) => object;
        Marker: new (options: object) => {
          addListener: (event: string, callback: () => void) => void;
        };
        LatLng: new (lat: number, lng: number) => object;
        Size: new (width: number, height: number) => object;
        Point: new (x: number, y: number) => object;
        MapTypeControlStyle: { [key: string]: number };
        ControlPosition: { [key: string]: number };
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
        (hyundaiMapRef.current ||
          multimarcaMapRef.current ||
          yantzazaMapRef.current) &&
        typeof window !== "undefined"
      ) {
        // Verificar si el script ya está cargado
        if (
          document.querySelector(
            'script[src*="maps.googleapis.com/maps/api/js"]'
          )
        ) {
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
      const hyundaiLocation = {
        lat: -3.977638239161408,
        lng: -79.20404956911804,
      };
      const multimarcaLocation = {
        lat: -3.977603460086567,
        lng: -79.2266462593288,
      };
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
        const hyundaiMap = new window.google.maps.Map(hyundaiMapRef.current, {
          ...mapOptions,
          center: hyundaiLocation,
        });

        const hyundaiMarker = new window.google.maps.Marker({
          position: hyundaiLocation,
          map: hyundaiMap,
          title: "GoMotors-HYUNDAI",
        });

        hyundaiMarker.addListener("click", () => {
          window.open(
            `https://www.google.com/maps?q=${hyundaiLocation.lat},${hyundaiLocation.lng}`,
            "_blank"
          );
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
          title: "GoMotors-Multimarca",
        });

        multimarcaMarker.addListener("click", () => {
          window.open(
            `https://www.google.com/maps?q=${multimarcaLocation.lat},${multimarcaLocation.lng}`,
            "_blank"
          );
        });
      }

      if (yantzazaMapRef.current) {
        const yantzazaMap = new window.google.maps.Map(yantzazaMapRef.current, {
          ...mapOptions,
          center: yantzazaLocation,
        });

        const yantzazaMarker = new window.google.maps.Marker({
          position: yantzazaLocation,
          map: yantzazaMap,
          title: "GoMotors-Yantzaza",
        });

        yantzazaMarker.addListener("click", () => {
          window.open(
            `https://www.google.com/maps?q=${yantzazaLocation.lat},${yantzazaLocation.lng}`,
            "_blank"
          );
        });
      }
    };

    loadGoogleMaps();
  }, []);



  return (
    <footer className="bg-[#0A0A0A] text-white py-10 md:py-1">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-10">
        {/* Sección de ubicaciones con mapas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-24">
          {/* Columna 1 - Hyundai */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">
              HYUNDAI-LOJA
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Ventas Hyundai
                </h4>
                <div className="flex items-start space-x-2">
                  <p className="text-gray-300 text-sm">
                    Av. 8 de Diciembre e Isidro Ayora, frente al Terminal
                    Terrestre
                  </p>
                </div>
                <div
                  ref={hyundaiMapRef}
                  className="w-full h-[200px] mt-2 rounded-lg overflow-hidden shadow-lg"
                ></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Posventa Hyundai
                </h4>
                <div className="flex items-start space-x-2">
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
              MULTIMARCA-LOJA
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Ventas Multimarca
                </h4>
                <div className="flex items-start space-x-2">
                  <p className="text-gray-300 text-sm">
                    Sector Belén Km 2 Vía a Catamayo
                  </p>
                </div>
                <div
                  ref={multimarcaMapRef}
                  className="w-full h-[200px] mt-2 rounded-lg overflow-hidden shadow-lg"
                ></div>
              </div>
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Posventa Multimarca
                </h4>
                <div className="flex items-start space-x-2">
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
              YANTZAZA-ZAMORA
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-white text-sm font-medium">
                  Ventas Yantzaza
                </h4>
                <div className="flex items-start space-x-2">
                  <p className="text-gray-300 text-sm">
                    Vía a el Pangui, junto a IASA
                  </p>
                </div>
                <div
                  ref={yantzazaMapRef}
                  className="w-full h-[200px] mt-2 rounded-lg overflow-hidden shadow-lg"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER ESTILO OSMO SUPPLY */}
      <div className="relative overflow-hidden border-t border-gray-800 bg-black">
        {/* Large background text */}
        <div
          className="absolute left-0 pointer-events-none overflow-hidden"
          style={{ bottom: "-1rem" }}
        >
          <div
            className="text-[8rem] sm:text-[10rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-bold text-white/10 select-none tracking-tight"
            style={{ lineHeight: "0.8" }}
          >
            <div>GO</div>
          </div>
        </div>

        <div className="relative z-10 w-full px-6 py-16">
          {/* Main footer content - 4 columns */}
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 mb-16 justify-items-start lg:justify-items-center">
            {/* SITEMAP Column */}
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                SECCIONES
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/showroom"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Showroom
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about-us"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#referente-go"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Referidos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/noticias"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Noticias
                  </Link>
                </li>
                <li>
                  <Link
                    href="/promociones"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Promociones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/trabaja-con-nosotros"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Trabaja con nosotros
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY Column */}
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                POLITICAS Y LEGAL
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/cookies"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link
                    href="/proteccion-datos"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    Política de Cookies
                  </Link>
                </li>
              </ul>
            </div>

            {/* CONTACT Column */}
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                CONTACTO
              </h3>
              <ul className="space-y-4">
                <li className="text-white">099-945-4243</li>
                <li className="text-white">(07) 2731143</li>
                <li className="text-white">recepcionloja@gomotors.com.ec</li>
                <li className="text-white">Loja, Ecuador</li>
              </ul>
            </div>

            {/* SOCIALS Column */}
            <div className="text-left">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">
                Redes SOCIALES
              </h3>

              {/* Facebook Section */}
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  
                  <h4 className="text-white font-semibold uppercase">
                    FACEBOOK
                  </h4>
                </div>
                <ul className="space-y-2 ml-2">
                  <li>
                    <a
                      href="https://www.facebook.com/gomotorshyundai1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      GOmotors Hyundai
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/IOmotorsGreatWall"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      GOmotors Multimarcas
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/gomotorsyantzaza"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      GOmotors Yantzaza
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/tmgomotors"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Posventa Multimarcas
                    </a>
                  </li>
                </ul>
              </div>

              {/* Instagram Section */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                
                  <h4 className="text-white font-semibold uppercase">
                    INSTAGRAM
                  </h4>
                </div>
                <ul className="space-y-2 ml-2">
                  <li>
                    <a
                      href="https://www.instagram.com/gomotors_hyundai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      GOmotors Hyundai
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/gomotors_greatwall/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      GOmotors Multimarcas
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/gomotors_yantzaza/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      GOmotors Yantzaza
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/gomotors_multimarcas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Posventa Multimarcas
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </div>

          {/* Bottom section */}
          <div className="pt-8 w-full">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
              {/* Copyright */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 space-y-4 lg:space-y-0"></div>

              {/* Designer credit */}
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400 uppercase">
                  ©2025 GoMotors. Todos los derechos reservados.
                </div>
                <Link href="/admin/solicitudes">
                  <button className="text-xs text-gray-600 hover:text-gray-400 transition-colors opacity-50 hover:opacity-100">
                    Admin
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
