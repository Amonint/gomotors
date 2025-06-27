"use client";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, orderBy, query, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

interface News {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [loading, setLoading] = useState(true);

  const loadNewsDetail = useCallback(async (newsId: string) => {
    try {
      const docRef = doc(db, 'news', newsId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newsData: News = {
          id: docSnap.id,
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        };
        setSelectedNews(newsData);
        setViewMode('detail');
      }
    } catch (error) {
      console.error("Error al cargar noticia:", error);
    }
  }, []);

  // Detectar parámetros de URL del lado del cliente
  useEffect(() => {
    const checkUrlParams = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname;
        const match = path.match(/\/noticias\/(.+)/);
        
        if (match && match[1] && news.length > 0) {
          loadNewsDetail(match[1]);
        }
      }
    };

    checkUrlParams();
  }, [news, loadNewsDetail]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
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
      } catch (error) {
        console.error("Error al cargar noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleNewsSelect = (newsItem: News) => {
    setSelectedNews(newsItem);
    setViewMode('detail');
    
    // Actualizar URL sin recargar la página
    if (typeof window !== 'undefined') {
      const newUrl = `/noticias/${newsItem.id}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedNews(null);
    
    // Actualizar URL sin recargar la página
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/noticias');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="bg-neutral-100 min-h-screen">
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-neutral-600">Cargando noticias...</p>
          </div>
        </div>
      </div>
    );
  }

  // Vista de detalle
  if (viewMode === 'detail' && selectedNews) {
    return (
      <div className="bg-neutral-100 min-h-screen">
        {/* Hero section */}
        <div className="relative h-[60vh] overflow-hidden">
          <Image
            src={selectedNews.imageUrl}
            alt={selectedNews.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-[1600px] mx-auto">
              <button 
                onClick={handleBackToList}
                className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a noticias
              </button>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4">
                {selectedNews.title}
              </h1>
              
              <div className="flex items-center text-white/80">
                <span className="block w-12 h-[2px] bg-white/30 mr-4"></span>
                <p className="text-sm font-medium uppercase tracking-wide">
                  {formatDate(selectedNews.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
          <article className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {selectedNews.description && selectedNews.description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-neutral-700 leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </div>
      </div>
    );
  }

  // Vista de lista
  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="w-full bg-[#F5F5F5] border-b border-neutral-300">
        <div className="max-w-[1600px] mx-auto px-6 py-12 md:py-16 lg:py-20">
          <div className="absolute top-4 md:top-8 left-4 md:left-8">
            <Link
              href="/"
              className="flex items-center text-white bg-black px-2 md:px-4 py-1 md:py-2 rounded-full hover:bg-neutral-800 transition-colors text-sm md:text-base"
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
            <div
              key={item.id}
              onClick={() => handleNewsSelect(item)}
              className="cursor-pointer"
            >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
