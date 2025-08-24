import { useEffect, useState } from "react";
import StarshipCard from "./components/StarshipCard";

type Starship = {
  name: string;
  model: string;
  manufacturer: string;
  starship_class: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  hyperdrive_rating: string;
};

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Starship[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setError(null);
      const endpoints = [
        "https://swapi.dev/api/starships/",
        "https://swapi.py4e.com/api/starships/", // respaldo
      ];

      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
          const json = await res.json();
          if (cancelled) return;
          setData(json.results as Starship[]);
          setLoading(false);
          return;
        } catch (e: any) {
          if (cancelled) return;
          if (url === endpoints[endpoints.length - 1]) {
            setError(e?.message ?? "Error al cargar los datos");
            setLoading(false);
          }
        }
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
          Naves de Star Wars
        </h1>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
          Naves de Star Wars
        </h1>
        <div className="bg-red-700 text-white p-6 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400 text-center">
        Naves de Star Wars
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((ship, i) => (
          <StarshipCard key={`${ship.model}-${i}`} ship={ship} />
        ))}
      </div>
    </div>
  );
}
