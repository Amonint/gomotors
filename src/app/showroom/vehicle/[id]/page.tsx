import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { getVehicleById, getVehicles } from "@/services/vehicleService";
import VehicleDetailClient from "./VehicleDetailClient";

// Add generateStaticParams function
export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function VehicleDetailPage({ params, searchParams }: Props) {
  const [resolvedParams] = await Promise.all([params, searchParams]);
  const vehicle = await getVehicleById(resolvedParams.id);
  const allVehicles = await getVehicles();
  const relatedVehicles = allVehicles
    .filter((v) => v.tipoVehiculo === vehicle?.tipoVehiculo && v.id !== vehicle?.id)
    .slice(0, 3);

  if (!vehicle) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] w-full bg-white text-gray-800 px-4">
        <div className="text-center max-w-lg">
          <h2 className="text-3xl font-bold mb-4">Vehículo no encontrado</h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, el vehículo que estás buscando no está disponible o ha
            sido eliminado.
          </p>
          <Link
            href="/showroom"
            className="inline-flex items-center bg-gray-900 text-white py-3 px-6 rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Volver al Showroom
          </Link>
        </div>
      </div>
    );
  }

  return <VehicleDetailClient vehicle={vehicle} relatedVehicles={relatedVehicles} />;
}
