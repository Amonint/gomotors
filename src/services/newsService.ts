import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

export interface News {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllNewsIds = async (): Promise<{ id: string }[]> => {
  try {
    const newsCollection = collection(db, 'news');
    const newsSnapshot = await getDocs(newsCollection);
    
    return newsSnapshot.docs.map(doc => ({
      id: doc.id
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}; 