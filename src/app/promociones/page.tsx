"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

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
        collection(db, "promotions"),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(promotionsQuery);
      const promotionsData = querySnapshot.docs.map((doc) => ({
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
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [promotions, isPaused]);

  const goToPrevious = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? promotions.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsPaused(false), 10000);
  };

  const goToNext = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsPaused(false), 10000);
  };

  if (promotions.length === 0) {
    return <div className="h-screen w-screen bg-gray-100" />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden group">
      {/* Back Button */}
      <div className="absolute top-8 left-8 z-[99]">
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
            index === currentIndex ? "opacity-100" : "opacity-0"
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

      {/* Navigation Arrows */}
      {promotions.length > 1 && (
        <>
          {/* Left Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 
                     w-12 h-12 bg-black/50 hover:bg-black/70 
                     rounded-full flex items-center justify-center
                     transition-all duration-300 opacity-0 group-hover:opacity-100
                     border border-white/20 hover:border-white/40"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 
                     w-12 h-12 bg-black/50 hover:bg-black/70 
                     rounded-full flex items-center justify-center
                     transition-all duration-300 opacity-0 group-hover:opacity-100
                     border border-white/20 hover:border-white/40"
            aria-label="Siguiente imagen"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicators - También mejorados */}
      {promotions.length > 1 && (
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 
                      flex space-x-3 opacity-70 hover:opacity-100 transition-opacity duration-200"
        >
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsPaused(true);
                setCurrentIndex(index);
                setTimeout(() => setIsPaused(false), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/30 ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/80 hover:scale-105"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
