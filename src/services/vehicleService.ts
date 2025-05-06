import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

// Definición de tipos basada en la estructura proporcionada
export interface Vehicle {
  id?: string;
  marca: string;
  modelo: string;
  año: string;
  tipoVehiculo: string;
  descripcion: string;
  imageUrls: string[];
  especificaciones: {
    motor: {
      principal: string;
      adicionales: string[];
    };
    transmision: {
      principal: string;
      adicionales: string[];
    };
    consumo: {
      principal: string;
      adicionales: string[];
    };
    potencia: {
      principal: string;
      adicionales: string[];
    };
  };
  caracteristicas: {
    seguridad: {
      principal: string;
      adicionales: string[];
    };
    confort: {
      principal: string;
      adicionales: string[];
    };
    exterior: {
      principal: string;
      adicionales: string[];
    };
  };
  coloresDisponibles: string[];
  createdAt?: number;
  updatedAt?: number;
}

// Obtener todos los vehículos
export const getVehicles = async (): Promise<Vehicle[]> => {
  try {
    const vehiclesCollection = collection(db, 'vehicles');
    const vehicleSnapshot = await getDocs(vehiclesCollection);
    
    return vehicleSnapshot.docs.map(doc => {
      const data = doc.data() as Vehicle;
      return {
        ...data,
        id: doc.id
      };
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};

// Obtener un vehículo por ID
export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  try {
    const vehicleDoc = doc(db, 'vehicles', id);
    const vehicleSnapshot = await getDoc(vehicleDoc);
    
    if (vehicleSnapshot.exists()) {
      const data = vehicleSnapshot.data() as Vehicle;
      return {
        ...data,
        id: vehicleSnapshot.id
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching vehicle with id ${id}:`, error);
    return null;
  }
}; 