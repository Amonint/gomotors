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
    w-full bg-[#111111] rounded-lg mt-2 p-5 space-y-3
    transform transition-all duration-200 ease-in-out
    max-h-[60vh] overflow-y-auto
    border border-[#1C1C1C]
  `,
  mobileMenu: `
    lg:hidden fixed top-[70px] left-0 right-0 
    bg-[#0A0A0A] border-t border-[#292C24] shadow-lg z-50
    max-h-[calc(100vh-70px)] overflow-y-auto
    transform transition-all duration-300 ease-in-out
  `,
  mobileMenuContainer: `
    container mx-auto px-5 py-7 animate-fadeIn
  `,
  mobileButton: `
    flex items-center justify-between w-full text-white 
    py-4 px-5 rounded-lg hover:bg-[#111111] transition-all duration-200
    text-[15px] font-medium
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
          <div className="flex items-center justify-between h-[80px] relative">
            {/* Logo */}
            <div
              className="flex-shrink-0"
              style={{ position: "absolute", left: "20px" }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/logogomo.png"
                  alt="Logo"
                  width={140}
                  height={40}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 2xl:space-x-4 mx-auto overflow-hidden">
              {/* Showroom */}
              <div>
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium px-1 lg:px-2 xl:px-3 2xl:px-[18px] py-[18px] whitespace-nowrap"
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
                    className={dropdownStyles.dropdown}
                    onMouseEnter={() => handleMouseEnter("showroom")}
                    onMouseLeave={handleMouseLeave}
                    style={{ top: "70px" }}
                  >
                    <div className={dropdownStyles.container}>
                      <div className={dropdownStyles.servicesMenu}>
                        {/* Hyundai Section */}
                        <div className={dropdownStyles.servicesMenuLeft}>
                          <h3 className={dropdownStyles.sectionTitle}>
                            Hyundai
                          </h3>
                          <a
                            href="https://hyundai.com.ec/"
                            className={dropdownStyles.menuLink}
                            onClick={() => setActiveDropdown("")}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver catálogo →
                          </a>
                        </div>

                        {/* Nuestras Marcas Section */}
                        <div className={dropdownStyles.servicesMenuRight}>
                          <div>
                            <h3 className={dropdownStyles.sectionTitle}>
                              Nuestras Marcas
                            </h3>
                            <div className="flex flex-col space-y-4">
                              <Link
                                href="/showroom"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                              >
                                Ver catálogo →
                              </Link>
                              
                              <div className="grid grid-cols-2 gap-4 mt-4">
                                <span className="text-gray-500 text-base font-medium cursor-default">DFSK</span>
                                <span className="text-gray-500 text-base font-medium cursor-default">Great Wall</span>
                                <span className="text-gray-500 text-base font-medium cursor-default">GWM</span>
                                <span className="text-gray-500 text-base font-medium cursor-default">Haval</span>
                                <span className="text-gray-500 text-base font-medium cursor-default">KYC</span>
                                <span className="text-gray-500 text-base font-medium cursor-default">Soueast</span>
                                <span className="text-gray-500 text-base font-medium cursor-default">SWM</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Postventa */}
              <div>
                <button
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium px-1 lg:px-2 xl:px-3 2xl:px-[18px] py-[18px] whitespace-nowrap"
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
                    className={dropdownStyles.dropdown}
                    onMouseEnter={() => handleMouseEnter("postventa")}
                    onMouseLeave={handleMouseLeave}
                    style={{ top: "70px" }}
                  >
                    <div className={dropdownStyles.container}>
                      <div className={dropdownStyles.servicesMenu}>
                        <div className={dropdownStyles.servicesMenuLeft}>
                          <h3 className={dropdownStyles.sectionTitle}>
                            Hyundai
                          </h3>
                          <ul className="space-y-4">
                            <li>
                              <a
                                href="https://www.hyundai.com.ec/citas-taller"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Agenda tu cita
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.hyundai.com.ec/campañas"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Campañas
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.hyundai.com.ec/repuestos"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Consulta tus repuestos
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className={dropdownStyles.servicesMenuLeft}>
                          <h3 className={dropdownStyles.sectionTitle}>
                            Multimarca
                          </h3>
                          <ul className="space-y-4">
                            <li>
                              <Link
                                href="https://wa.me/593999454243?text=Quiero%20agendar%20una%20cita%20con%20taller"
                                className={dropdownStyles.menuLink}
                                onClick={() => setActiveDropdown("")}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Agenda tu cita
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Nosotros */}
              <div>
                <Link
                  href="/#about-us"
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("about-us");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium px-1 lg:px-2 xl:px-3 2xl:px-[18px] py-[18px] whitespace-nowrap"
                >
                  NOSOTROS
                </Link>
              </div>

              {/* Referente-GO */}
              <div>
                <Link
                  href="/#referente-go"
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("referente-go");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium px-1 lg:px-2 xl:px-3 2xl:px-[18px] py-[18px] whitespace-nowrap"
                >
                  GANA REFERIDOS
                </Link>
              </div>

              {/* Noticias */}
              <div>
                <Link
                  href="/noticias"
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium px-1 lg:px-2 xl:px-3 2xl:px-[18px] py-[18px] whitespace-nowrap"
                >
                  NOTICIAS
                </Link>
              </div>

              {/* Promociones */}
              <div>
                <Link
                  href="/promociones"
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium px-1 lg:px-2 xl:px-3 2xl:px-[18px] py-[18px] whitespace-nowrap"
                >
                  PROMOCIONES
                </Link>
              </div>

              {/* Trabaja con nosotros */}
              <div>
                <Link
                  href="/trabaja-con-nosotros"
                  className="flex items-center text-gray-300 hover:text-white transition-colors text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium px-1 lg:px-2 xl:px-3 2xl:px-[18px] py-[18px] whitespace-nowrap"
                >
                  <span className="hidden 2xl:inline">TRABAJA CON NOSOTROS</span>
                  <span className="2xl:hidden">ÚNETE AL EQUIPO</span>
                </Link>
              </div>
            </nav>

            {/* Right Side Navigation */}
            <div
              className="hidden lg:flex items-center"
              style={{ position: "absolute", right: "20px" }}
            >
              <Link
                href="/proteccion-datos"
                className="text-gray-300 hover:text-white transition-colors text-[9px] lg:text-[10px] xl:text-xs 2xl:text-sm whitespace-nowrap"
              >
                Política privacidad de datos
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden absolute right-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2.5 rounded-lg hover:bg-[#111111] transition-all duration-200"
                aria-label="Toggle menu"
              >
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    isMenuOpen ? "rotate-180" : ""
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
                    d={
                      isMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`${dropdownStyles.mobileMenu} ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <div className={dropdownStyles.mobileMenuContainer}>
            <nav className="flex flex-col space-y-3">
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
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                        Hyundai
                      </h3>
                      <a
                        href="https://hyundai.com.ec/"
                        className="block text-white hover:text-[#ffe600] transition-colors text-base font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                      >
                        Ver catálogo →
                      </a>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                        Nuestras Marcas
                      </h3>
                      <div className="space-y-4">
                        <Link
                          href="/showroom"
                          className="block text-white hover:text-[#ffe600] transition-colors text-base font-medium"
                          onClick={() => {
                            setActiveDropdown("");
                            setIsMenuOpen(false);
                          }}
                        >
                          Ver catálogo →
                        </Link>

                        <div className="space-y-3 pt-2">
                          <span className="block text-gray-500 text-base font-medium">DFSK</span>
                          <span className="block text-gray-500 text-base font-medium">Great Wall</span>
                          <span className="block text-gray-500 text-base font-medium">GWM</span>
                          <span className="block text-gray-500 text-base font-medium">Haval</span>
                          <span className="block text-gray-500 text-base font-medium">KYC</span>
                          <span className="block text-gray-500 text-base font-medium">Soueast</span>
                          <span className="block text-gray-500 text-base font-medium">SWM</span>
                        </div>
                      </div>
                    </div>
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
                      activeDropdown === "mobile-postventa" ? "rotate-180" : ""
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
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">HYUNDAI</h4>
                      <a
                        href="https://www.hyundai.com.ec/citas-taller"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Agenda tu cita
                      </a>
                      <a
                        href="https://www.hyundai.com.ec/campañas"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Campañas
                      </a>
                      <a
                        href="https://www.hyundai.com.ec/repuestos"
                        className="block text-gray-300 hover:text-white transition-colors py-2"
                        onClick={() => {
                          setActiveDropdown("");
                          setIsMenuOpen(false);
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Consulta tus repuestos
                      </a>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">
                        MULTIMARCA
                      </h4>
                      <ul className="space-y-2 ml-4">
                        <li>
                          <Link
                            href="https://wa.me/593999454243?text=Quiero%20agendar%20una%20cita%20con%20taller"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={dropdownStyles.menuLink}
                            onClick={() => setActiveDropdown("")}
                          >
                            Agenda tu cita
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Nosotros */}
              <div>
                <Link
                  href="/#about-us"
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("about-us");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                    setIsMenuOpen(false);
                  }}
                  className={dropdownStyles.mobileButton}
                >
                  <span>NOSOTROS</span>
                </Link>
              </div>

              {/* Mobile Referente-GO */}
              <div>
                <Link
                  href="/#referente-go"
                  scroll={false}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("referente-go");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                    setIsMenuOpen(false);
                  }}
                  className={dropdownStyles.mobileButton}
                >
                  <span>REFERIDOS</span>
                </Link>
              </div>

              {/* Mobile Noticias */}
              <div>
                <Link
                  href="/noticias"
                  className={dropdownStyles.mobileButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>NOTICIAS</span>
                </Link>
              </div>

              {/* Mobile Promociones */}
              <div>
                <Link
                  href="/promociones"
                  className={dropdownStyles.mobileButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>PROMOCIONES</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/trabaja-con-nosotros"
                  className={dropdownStyles.mobileButton}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>TRABAJA CON NOSOTROS</span>
                </Link>
              </div>

              {/* Mobile: Contact & Policy Links */}
              <div className="mt-4 pt-4 border-t border-[#292C24] space-y-3">
                <Link
                  href="/proteccion-datos"
                  className="block text-gray-300 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Política privacidad de datos
                </Link>
                
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
