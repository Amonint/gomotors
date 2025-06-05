'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface NewsDetail {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function NewsDetailPage() {
  const params = useParams();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const docRef = doc(db, 'news', params.id as string);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setNews({
            id: docSnap.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          } as NewsDetail);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [params.id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="bg-neutral-100 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-neutral-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="bg-neutral-100 min-h-screen">
        <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
          <h1 className="text-2xl font-bold mb-4 text-neutral-800">Noticia no encontrada</h1>
          <Link href="/noticias" className="text-neutral-600 hover:text-neutral-800 transition-colors">
            Volver a noticias
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-100 min-h-screen">
      {/* Hero section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={news.imageUrl}
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1600px] mx-auto">
            <Link 
              href="/noticias" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a noticias
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4">
              {news.title}
            </h1>
            
            <div className="flex items-center text-white/80">
              <span className="block w-12 h-[2px] bg-white/30 mr-4"></span>
              <p className="text-sm font-medium uppercase tracking-wide">
                {formatDate(news.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24">
        <article className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {news.description.split('\n').map((paragraph, index) => (
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