"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

interface News {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const newsQuery = query(
        collection(db, "news"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(newsQuery);
      const newsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as News[];

      setNews(newsData);
    };

    fetchNews();
  }, []);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="absolute top-8 left-8">
            <Link
              href="/"
              className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
            >
              <FaArrowLeft className="mr-2 text-white" /> Volver
            </Link>
          </div>

          <div className="flex flex-col items-center md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-light text-neutral-600 tracking-wide">
                Noticias y Actualidades
              </h2>
              <h3 className="text-2xl md:text-3xl font-normal text-neutral-800 mt-2">
                GOmotors al día: novedades que aceleran tu vida
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link href={`/noticias/${item.id}`} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-neutral-200 hover:border-neutral-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="block w-12 h-[2px] bg-neutral-300 mr-4"></span>
                    <p className="text-neutral-500 text-sm font-medium uppercase tracking-wide">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-800 mb-3 line-clamp-2 group-hover:text-neutral-900 transition-colors">
                    {item.title}
                  </h2>
                  <div className="flex items-center text-neutral-500 text-sm">
                    <span className="hover:text-neutral-700 transition-colors">
                      Leer más →
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
