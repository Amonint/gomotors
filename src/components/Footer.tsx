"use client";

import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-6">
        {/* Navegación principal - Estructurado exactamente como Veritas */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-24">
          {/* Columna 1 */}
          <div className="md:col-span-3 space-y-6">
            <Image 
              src="/images/logo.png" 
              alt="GoMotors Logo" 
              width={110} 
              height={45} 
              className="brightness-0 invert mb-4"
            />
            
            <div className="space-y-2">
              <div><Link href="/about-us" className="text-white uppercase text-sm font-medium hover:text-gray-300">SOBRE NOSOTROS</Link></div>
              <div><Link href="/showroom" className="text-white uppercase text-sm font-medium hover:text-gray-300">SHOWROOM</Link></div>
              <div><Link href="/contact-us" className="text-white uppercase text-sm font-medium hover:text-gray-300">CONTÁCTANOS</Link></div>
            </div>
          </div>
          
          {/* Espacio */}
          <div className="md:col-span-1"></div>
          
          {/* Columna 2 */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">VEHÍCULOS</h3>
            <div className="space-y-2">
              <div><Link href="/showroom/suv" className="text-white text-sm hover:text-gray-300">SUVs & Crossovers</Link></div>
              <div><Link href="/showroom/sedanes" className="text-white text-sm hover:text-gray-300">Sedanes</Link></div>
              <div><Link href="/showroom/deportivos" className="text-white text-sm hover:text-gray-300">Pick Ups</Link></div>
            </div>
          </div>
          
          {/* Columna 3 */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">SERVICIOS</h3>
            <div className="space-y-2">
              <div><Link href="/financing" className="text-white text-sm hover:text-gray-300">Financiamiento</Link></div>
              <div><Link href="/maintenance" className="text-white text-sm hover:text-gray-300">Mantenimiento</Link></div>
              <div><Link href="/insurance" className="text-white text-sm hover:text-gray-300">Seguros</Link></div>
            </div>
          </div>
          
          {/* Columna 4 */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">MARCAS</h3>
            <div className="space-y-2">
              <div><Link href="/brands/hyundai" className="text-white text-sm hover:text-gray-300">Hyundai</Link></div>
              <div><Link href="/brands/great-wall" className="text-white text-sm hover:text-gray-300">Great Wall</Link></div>
              <div><Link href="/brands/swm" className="text-white text-sm hover:text-gray-300">SWM</Link></div>
            </div>
          </div>
        </div>
        
        {/* Título Get In Touch y línea separadora */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-4">Contác<span className="text-[#ffe600]">tanos</span></h2>
          <div className="h-px w-full bg-gray-800"></div>
        </div>
        
        {/* Información de contacto */}
        <div className="flex flex-col md:flex-row md:justify-end mb-14 md:mb-28">
          <div className="text-left md:text-right md:ml-auto space-y-3 mb-5 md:mb-0">
            <p className="text-white text-base">(07) 2731143</p>
            <p className="text-white text-base">Av. 8 de Diciembre e Isidro Ayora</p>
            <p className="text-white text-base">Loja, Ecuador</p>
          </div>
          
          <div className="flex md:flex-col md:ml-8 md:space-y-4">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="w-7 h-7 text-[#ffe600] hover:text-gray-300 transition-colors" />
            </a>
            {/* Instagram icon only visible on desktop */}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden md:block">
              <FaInstagramSquare className="w-7 h-7 text-[#ffe600] hover:text-gray-300 transition-colors" />
            </a>
          </div>
        </div>
        
        {/* Información legal */}
        <div className="pt-6 mb-3">
          <p className="text-xs text-gray-400 mb-3">&copy; 2024 GoMotors. Todos los derechos reservados.</p>
          
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 text-xs text-gray-400">
            <div className="flex space-x-5">
              <Link href="/terms" className="hover:text-white transition-colors">Términos y Condiciones</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
            </div>
            <p className="md:ml-auto">RUC: 1191714663001</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
