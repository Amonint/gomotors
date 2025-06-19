import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase/config';

export interface Accessory {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export class AccessoryService {
  private static collectionName = 'accessories';

  /**
   * Obtiene todos los accesorios desde Firestore ordenados por fecha de creación (más recientes primero)
   */
  static async getAllAccessories(): Promise<Accessory[]> {
    try {
      const accessoriesRef = collection(db, this.collectionName);
      const q = query(accessoriesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const accessories: Accessory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        accessories.push({
          id: doc.id,
          name: data.name,
          imageUrl: data.imageUrl,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      
      return accessories;
    } catch (error) {
      console.error('Error al obtener accesorios:', error);
      throw new Error('No se pudieron cargar los accesorios');
    }
  }

  /**
   * Obtiene un accesorio específico por ID
   */
  static async getAccessoryById(id: string): Promise<Accessory | null> {
    try {
      const accessories = await this.getAllAccessories();
      return accessories.find(acc => acc.id === id) || null;
    } catch (error) {
      console.error('Error al obtener accesorio:', error);
      return null;
    }
  }
} 