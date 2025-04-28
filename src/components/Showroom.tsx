import React from "react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    title: "Somos el mayor showroom del sur del país",
    desc: "Más de 500 autos de diferentes marcas y segmentos."
  },
  {
    title: "Atención personalizada",
    desc: "Asesoría experta y acompañamiento en todo el proceso."
  },
  {
    title: "Garantía y respaldo",
    desc: "Solo vehículos certificados y con garantía real."
  }
];

const Showroom = () => {
  return (
    <section className="w-full bg-[#0A0A0A] text-white py-24 font-tt-hoves">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
        {/* Columna izquierda: texto y beneficios */}
        <div className="flex-1 w-full max-w-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            ¿Por qué elegir nuestro <span className="text-[#ffe600]">Showroom</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Descubre la mejor selección de vehículos de prestigio, atención personalizada y el respaldo de un grupo líder en el sector automotriz.
          </p>
          <ul className="space-y-6 mb-10">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="text-[#ffe600] text-2xl font-bold">0{i+1}</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{b.title}</h3>
                  <p className="text-gray-400 text-base">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/showroom" className="inline-block bg-[#ffe600] text-black font-semibold px-7 py-3 rounded-full shadow hover:bg-[#fff200] transition-colors text-lg">
            Explora el Showroom
          </Link>
        </div>

        {/* Columna derecha: cards visuales */}
        <div className="flex-1 w-full flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Card superdeportivos */}
          <div className="bg-[#181818] rounded-2xl overflow-hidden shadow-lg w-[320px] max-w-full flex flex-col">
            <div className="relative h-48 w-full">
              <Image
                src="/images/luxury-car.jpg"
                alt="Superdeportivo en Showroom"
                fill
                className="object-cover"
                sizes="320px"
                priority
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <h3 className="text-2xl font-bold mb-2">Superdeportivos</h3>
              <p className="text-gray-400 mb-4">Explora el mundo de los superdeportivos en nuestro showroom.</p>
              <Link href="/showroom/deportivos" className="text-[#ffe600] font-semibold hover:underline">Ver más →</Link>
            </div>
          </div>

          {/* Card cantidad de autos */}
          <div className="bg-[#ffe600] text-black rounded-2xl overflow-hidden shadow-lg w-[220px] max-w-full flex flex-col items-center justify-center py-10 px-6">
            <div className="relative w-28 h-16 mb-4">
              <Image
                src="/images/about-us/about-us1.jpg"
                alt="Auto destacado"
                fill
                className="object-cover rounded-xl"
                sizes="112px"
                priority
              />
            </div>
            <div className="text-4xl font-extrabold mb-2">+500</div>
            <div className="text-lg font-medium text-center">Autos de diferentes marcas</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showroom; 