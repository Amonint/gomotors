import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import NewsDetailClient from './NewsDetailClient';

interface NewsDetail {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function generateStaticParams() {
  const newsCollection = collection(db, 'news');
  const newsSnapshot = await getDocs(newsCollection);
  const news = newsSnapshot.docs.map(doc => ({
    id: doc.id,
  }));

  return news;
}

async function getNewsData(id: string): Promise<NewsDetail | null> {
  const docRef = doc(db, 'news', id);
  const docSnap = await getDoc(docRef);
  
  if (!docSnap.exists()) {
    return null;
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl,
    createdAt: data.createdAt?.toDate(),
    updatedAt: data.updatedAt?.toDate(),
  } as NewsDetail;
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const news = await getNewsData(resolvedParams.id);
  return <NewsDetailClient initialNews={news} />;
} 