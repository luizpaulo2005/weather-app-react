import { FormEvent, useState } from "react";
import axios from "axios";
import { Card } from "./components/card";

interface CityWeather {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export const App = () => {
  const [city, setCity] = useState<string>("");
  const [attributes, setAttributes] = useState<CityWeather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeather = async (query: string) => {
    if(!attributes){
      setAttributes(null);
    }
    setError(null);
    setLoading(true);
    try {
      await axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_KEY_API
        }&q=${query}&aqi=yes`
      )
      .then((res) => {
        setAttributes(res.data);
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    
  };

  const handleFetch = (e: FormEvent) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen overflow-hidden">
      <div className="h-10 gap-2 flex flex-row">
      <input
        className="border p-2 rounded-md focus:outline-none dark:border-none dark:bg-zinc-800"
        placeholder="Digite o nome da cidade"
        onChange={(e) => setCity(e.target.value)}
        type="text"
        value={city}
      />
      <button
        onClick={handleFetch}
        className="p-2 rounded-md text-white bg-blue-600 transition-colors hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
      >
        Buscar
      </button>
      </div>
      <div>
        {loading && <p>Carregando...</p>}
        {attributes && (
          <Card current={attributes.current} location={attributes.location} />
          )}
          {error && <p>{error}</p>}
      </div>
    </div>
  );
};
