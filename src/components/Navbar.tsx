"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Define dropdown styles
const dropdownStyles = {
  dropdown: `
    fixed left-0 w-full bg-[#0A0A0A] z-50 
    border-t border-[#292C24] shadow-xl
    transform transition-all duration-200
    overflow-hidden max-h-[calc(100vh-70px)]
  `,
  container: `
    container mx-auto py-9 px-5 max-w-7xl
  `,
  staticDropdown: `
    static md:relative group
  `,
  mobileDropdown: `
    w-full bg-[#111111] rounded-md mt-3 p-5 space-y-3
    transform transition-all duration-200
    max-h-[60vh] overflow-y-auto
  `,
  mobileMenu: `
    lg:hidden fixed top-[70px] left-0 right-0 
    bg-[#0A0A0A] border-t border-[#292C24] shadow-lg z-50
    max-h-[calc(100vh-70px)] overflow-y-auto
  `,
  mobileMenuContainer: `
    container mx-auto px-5 py-7
  `,
  mobileButton: `
    flex items-center justify-between w-full text-white 
    py-3.5 px-5 rounded-md hover:bg-[#111111] transition-colors
  `,
  mobileLink: `
    block text-white py-3.5 px-5 rounded-md 
    hover:bg-[#111111] transition-colors
  `,
  servicesMenu: `
    flex flex-col md:flex-row
  `,
  servicesMenuLeft: `
    w-full md:w-1/4 pr-0 md:pr-9 mb-7 md:mb-0
  `,
  servicesMenuRight: `
    w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-7
  `,
  sectionTitle: `
    text-gray-400 font-medium mb-5 text-[0.99rem] uppercase tracking-wider
  `,
  menuLink: `
    text-white hover:text-[#ffe600] transition-colors text-[1.12rem] font-medium
  `,
  card: `
    bg-[#0A0A0A] rounded-lg overflow-hidden 
    border border-[#1C1C1C] h-full relative
    hover:border-[#292C24] transition-all duration-200
  `,
  cardContent: `
    pt-[18px] px-7 pb-7 relative z-10
  `,
  cardTitle: `
    text-[1.23rem] font-bold text-white mb-2
  `,
  cardDescription: `
    text-[0.99rem] text-gray-400 mb-4
  `,
  button: `
    text-base font-medium py-2.5 px-7 rounded-full transition-colors min-w-[110px] text-center
  `,
  buttonOutline: `
    text-gray-300 hover:text-white border border-gray-600 hover:border-white
  `,
  buttonFilled: `
    bg-white hover:bg-opacity-90 text-[#0A0A0A]
  `,
  buttonMobile: `
    block w-full py-2.5 px-7 font-medium rounded-full text-center transition-colors
  `,
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Manejar el scroll para cambiar el estilo de la navbar
  useEffect(() => {
    // Inicializar el estado de scroll al cargar la página
    if (window.scrollY > 10) {
      setIsScrolled(true);
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cerrar el menú móvil cuando se cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Evitar el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Función para alternar los dropdowns
  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown("");
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Función para manejar el hover con delay
  const handleMouseEnter = (dropdown: string) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after a short delay
    // This prevents accidental closing when moving between dropdown elements
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown("");
    }, 150); // 150ms delay
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Cerrar dropdowns al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)
      ) {
        setActiveDropdown("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Función para asignar refs
  const setDropdownRef = (element: HTMLDivElement | null, key: string) => {
    dropdownRefs.current[key] = element;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0A0A0A] shadow-lg" : "bg-[#0A0A0A]"
        }`}
      >
        <div className="w-full">
          <div className="flex items-center h-[80px] relative">
            {/* Logo */}
            <div className="flex-shrink-0" style={{position: 'absolute', left: '0', paddingLeft: '5px'}}>
              <Link href="/" className="flex items-center">
                <span className="text-white font-bold flex items-center">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={140}
                    height={40}
                    className="object-contain"
                    priority
                    style={{marginLeft: 0, paddingLeft: 0}}
                  />
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-1.5 mx-auto">
              {/* Showroom */}
              <div className={dropdownStyles.staticDropdown}>
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-base font-medium px-[18px] py-[18px]"
                  onClick={() => toggleDropdown("showroom")}
                  onMouseEnter={() => handleMouseEnter("showroom")}
                >
                  SHOWROOM
                  <svg
                    className={`w-[18px] h-[18px] ml-1 transform transition-transform ${
                      activeDropdown === "showroom" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Showroom Dropdown */}
                {activeDropdown === "showroom" && (
                  <div
                    ref={(el) => setDropdownRef(el, "showroom")}
                    id="showroom-dropdown"
                    className={dropdownStyles.dropdown}
                    onMouseEnter={() => handleMouseEnter("showroom")}
                    onMouseLeave={handleMouseLeave}
                    style={{ top: "70px" }}
                  >
                    <div className={dropdownStyles.container}>
                      <div className={dropdownStyles.servicesMenu}>
                        <div className={dropdownStyles.servicesMenuLeft}>
                          <h3 className={dropdownStyles.sectionTitle}>
                            Nuestras Marcas
                          </h3>
                          <ul className="space-y-4">
                            <li>
                              <Link
                                href="/showroom/deportivos"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Hyundai
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/showroom/sedanes"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Great Wall
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/showroom/suv"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Haval
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/showroom/electricos"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Soueast
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/showroom/hibridos"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Shineray
                              </Link>
                            </li>
                            
                          </ul>
                        </div>

                        <div className={dropdownStyles.servicesMenuRight}>
                          <Link
                            href="/showroom/destacado"
                            className="block group"
                            onClick={() => setActiveDropdown("")}
                          >
                            <div
                              className={`${dropdownStyles.card} w-1/2 mx-auto`}
                            >
                              <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-0 w-full h-16 bg-gradient-to-r from-[#ffe600]/10 to-[#ffd700]/10 rounded-t-lg"></div>
                                <div className="absolute top-0 left-0 right-0 mx-auto w-4/5 h-28 bg-[#ffe600]/5 rounded-full blur-3xl -translate-y-1/2"></div>
                              </div>
                              <div className="pt-[12px] px-4 pb-4 relative z-10">
                                <div className="flex items-center gap-2 mb-1">
                                  <svg
                                    className="w-5 h-5 text-[#ffe600]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M13 10V3L4 14h7v7l9-11h-7z"
                                    ></path>
                                  </svg>
                                  <h3 className="text-base font-bold text-white">
                                    Vehículo Destacado
                                  </h3>
                                </div>
                                <p className="text-sm text-gray-400 mb-2">
                                  Descubre nuestro modelo más reciente y
                                  exclusivo
                                </p>
                                <div className="text-xs text-[#ffe600] font-medium">
                                  Ver más →
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Postventa */}
              <div className={dropdownStyles.staticDropdown}>
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-base font-medium px-[18px] py-[18px]"
                  onClick={() => toggleDropdown("postventa")}
                  onMouseEnter={() => handleMouseEnter("postventa")}
                >
                  POSTVENTA
                  <svg
                    className={`w-[18px] h-[18px] ml-1 transform transition-transform ${
                      activeDropdown === "postventa" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Postventa Dropdown */}
                {activeDropdown === "postventa" && (
                  <div
                    ref={(el) => setDropdownRef(el, "postventa")}
                    id="postventa-dropdown"
                    className={dropdownStyles.dropdown}
                    onMouseEnter={() => handleMouseEnter("postventa")}
                    onMouseLeave={handleMouseLeave}
                    style={{ top: "70px" }}
                  >
                    <div className={dropdownStyles.container}>
                      <div className={dropdownStyles.servicesMenu}>
                        <div className={dropdownStyles.servicesMenuLeft}>
                          <h3 className={dropdownStyles.sectionTitle}>
                            Servicios Postventa
                          </h3>
                          <ul className="space-y-4">
                            <li>
                              <Link
                                href="/postventa/mantenimiento"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Mantenimiento Preventivo
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/postventa/reparacion"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Reparaciones
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/postventa/repuestos"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Repuestos Originales
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/postventa/garantia"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Campañas
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/postventa/asistencia"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Asistencia en Carretera
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div className={dropdownStyles.servicesMenuRight}>
                          <Link
                            href="/postventa/cita"
                            className="block group"
                            onClick={() => setActiveDropdown("")}
                          >
                            <div
                              className={`${dropdownStyles.card} w-1/2 mx-auto`}
                            >
                              <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-0 w-full h-16 bg-gradient-to-r from-[#ffe600]/10 to-[#ffd700]/10 rounded-t-lg"></div>
                                <div className="absolute top-0 left-0 right-0 mx-auto w-4/5 h-28 bg-[#ffe600]/5 rounded-full blur-3xl -translate-y-1/2"></div>
                              </div>
                              <div className="pt-[12px] px-4 pb-4 relative z-10">
                                <div className="flex items-center gap-2 mb-1">
                                  <svg
                                    className="w-5 h-5 text-[#ffe600]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                  <h3 className="text-base font-bold text-white">
                                    Agenda tu Cita
                                  </h3>
                                </div>
                                <p className="text-sm text-gray-400 mb-2">
                                  Programa tu mantenimiento con nuestros
                                  especialistas
                                </p>
                                <div className="text-xs text-[#ffe600] font-medium">
                                  Agendar ahora →
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Nosotros - Enlace simple */}
              <div>
                <Link
                  href="/nosotros"
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-base font-medium px-[18px] py-[18px]"
                >
                  NOSOTROS
                </Link>
              </div>
              <div>
                <Link
                  href="/mantenimientos-preventivos"
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-base font-medium px-[18px] py-[18px]"
                >
                  MANTENIMIENTO
                </Link>
              </div>
            </nav>

            {/* Right Side Navigation */}
            <div className="hidden lg:flex items-center pr-2 md:pr-4" style={{position: 'absolute', right: '0'}}>
              <Link
                href="/politica-privacidad"
                className="text-gray-300 hover:text-white transition-colors text-sm"
              >
                Política privacidad de datos
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2.5"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={dropdownStyles.mobileMenu}>
            <div className={dropdownStyles.mobileMenuContainer}>
              <nav className="flex flex-col space-y-2">
                {/* Mobile Showroom */}
                <div>
                  <button
                    className={dropdownStyles.mobileButton}
                    onClick={() => toggleDropdown("mobile-showroom")}
                  >
                    <span>SHOWROOM</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        activeDropdown === "mobile-showroom" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {activeDropdown === "mobile-showroom" && (
                    <div className={dropdownStyles.mobileDropdown}>
                      <Link
                        href="/showroom/deportivos"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Deportivos
                      </Link>
                      <Link
                        href="/showroom/sedanes"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Sedanes
                      </Link>
                      <Link
                        href="/showroom/suv"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        SUVs
                      </Link>
                      <Link
                        href="/showroom/electricos"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Eléctricos
                      </Link>
                      <Link
                        href="/showroom/hibridos"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Híbridos
                      </Link>
                      <Link
                        href="/showroom/lujo"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Lujo
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Postventa */}
                <div>
                  <button
                    className={dropdownStyles.mobileButton}
                    onClick={() => toggleDropdown("mobile-postventa")}
                  >
                    <span>POSTVENTA</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        activeDropdown === "mobile-postventa"
                          ? "rotate-180"
                          : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {activeDropdown === "mobile-postventa" && (
                    <div className={dropdownStyles.mobileDropdown}>
                      <Link
                        href="/postventa/mantenimiento"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Mantenimiento Preventivo
                      </Link>
                      <Link
                        href="/postventa/reparacion"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Reparaciones
                      </Link>
                      <Link
                        href="/postventa/repuestos"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Repuestos Originales
                      </Link>
                      <Link
                        href="/postventa/garantia"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Garantía Extendida
                      </Link>
                      <Link
                        href="/postventa/asistencia"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Asistencia en Carretera
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Nosotros */}
                <div>
                  <Link
                    href="/nosotros"
                    className={dropdownStyles.mobileButton}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>NOSOTROS</span>
                  </Link>
                </div>

                {/* Mobile: Contact & Policy Links */}
                <div className="mt-4 pt-4 border-t border-[#292C24] space-y-3">
                  <Link
                    href="/politica-privacidad"
                    className="block text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Política privacidad de datos
                  </Link>
                  <Link
                    href="/contacto"
                    className={`${dropdownStyles.buttonMobile} bg-white text-black hover:bg-gray-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contáctanos
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
