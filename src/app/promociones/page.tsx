'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface Promotion {
  id: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      const promotionsQuery = query(
        collection(db, 'promotions'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(promotionsQuery);
      const promotionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Promotion[];
      
      setPromotions(promotionsData);
    };

    fetchPromotions();
  }, []);

  useEffect(() => {
    if (promotions.length > 0 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [promotions, isPaused]);

  const goToPrevious = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? promotions.length - 1 : prevIndex - 1
    );
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };

  const goToNext = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
    );
    // Resume autoplay after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };

  if (promotions.length === 0) {
    return <div className="h-screen w-screen bg-gray-100" />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden group">
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-50">
  <Link
    href="/"
    className="flex items-center text-white bg-black px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors"
  >
    <FaArrowLeft className="mr-2 text-white" /> Volver
  </Link>
</div>


      {/* Images */}
      {promotions.map((promotion, index) => (
        <div
          key={promotion.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={promotion.imageUrl}
            alt="Promoción"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Navigation Arrows - Only show if more than 1 promotion */}
      {promotions.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
                     w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     hover:bg-black/30 active:scale-95 transition-all"
            aria-label="Imagen anterior"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 
                     w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300
                     hover:bg-black/30 active:scale-95 transition-all"
            aria-label="Siguiente imagen"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="text-white"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {promotions.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 
                      flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPaused(true);
                setCurrentIndex(index);
                setTimeout(() => setIsPaused(false), 10000);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}