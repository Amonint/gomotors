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
              src="/images/logoLiv.svg" 
              alt="Liv Logo" 
              width={110} 
              height={45} 
              className="brightness-0 invert mb-4"
            />
            
            <div className="space-y-2">
              <div><Link href="/about-us" className="text-white uppercase text-sm font-medium hover:text-gray-300">ABOUT US</Link></div>
              <div><Link href="/insights" className="text-white uppercase text-sm font-medium hover:text-gray-300">INSIGHTS</Link></div>
              <div><Link href="/contact-us" className="text-white uppercase text-sm font-medium hover:text-gray-300">CONTACT US</Link></div>
            </div>
          </div>
          
          {/* Espacio */}
          <div className="md:col-span-1"></div>
          
          {/* Columna 2 */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">FOR LAWYERS</h3>
            <div className="space-y-2">
              <div><Link href="/partners" className="text-white text-sm hover:text-gray-300">Partners</Link></div>
              <div><Link href="/associates" className="text-white text-sm hover:text-gray-300">Associates</Link></div>
            </div>
          </div>
          
          {/* Columna 3 */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">FOR LAW FIRMS</h3>
            <div className="space-y-2">
              <div><Link href="/partner-search" className="text-white text-sm hover:text-gray-300">Partner Search</Link></div>
              <div><Link href="/associate-placement" className="text-white text-sm hover:text-gray-300">Associate Placement</Link></div>
              <div><Link href="/consulting-services" className="text-white text-sm hover:text-gray-300">Consulting Services</Link></div>
            </div>
          </div>
          
          {/* Columna 4 */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-gray-400 uppercase text-sm font-medium">IN-HOUSE LEGAL</h3>
            <div className="space-y-2">
              <div><Link href="/general-counsel-search" className="text-white text-sm hover:text-gray-300">General Counsel Search</Link></div>
              <div><Link href="/legal-counsel-search" className="text-white text-sm hover:text-gray-300">Legal Counsel Search</Link></div>
            </div>
          </div>
        </div>
        
        {/* Título Get In Touch y línea separadora */}
        <div className="mb-8 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="h-px w-full bg-gray-800"></div>
        </div>
        
        {/* Información de contacto */}
        <div className="flex flex-col md:flex-row md:justify-end mb-14 md:mb-28">
          <div className="text-left md:text-right md:ml-auto space-y-3 mb-5 md:mb-0">
            <p className="text-white text-base">+593 961022800</p>
            <p className="text-white text-base">payala909@gmail.com</p>
            <p className="text-white text-base">Loja, Ecuador</p>
          </div>
          
          <div className="flex md:flex-col md:ml-8 md:space-y-4">
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="w-7 h-7 text-[#B3F266] hover:text-gray-300 transition-colors" />
            </a>
            {/* Instagram icon only visible on desktop */}
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden md:block">
              <FaInstagramSquare className="w-7 h-7 text-[#B3F266] hover:text-gray-300 transition-colors" />
            </a>
          </div>
        </div>
        
        {/* Información legal */}
        <div className="pt-6 mb-3">
          <p className="text-xs text-gray-400 mb-3">&copy; 2024 by Liv.</p>
          
          <div className="flex flex-col md:flex-row md:space-x-10 space-y-2 md:space-y-0 text-xs text-gray-400">
            <div className="flex space-x-5">
              <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
            <p className="md:ml-auto">Company No: 12857907</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
