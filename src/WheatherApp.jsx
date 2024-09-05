import { useState } from "react";

export const WheatherApp = () => {
  const urlBase = " https://api.openweathermap.org/data/2.5/weather";
  const api_key = "43cd027b2ff060e3a6bca3755cbaa523";
  const difKelvin = 273.15;

  const [ciudad, setCiudad] = useState("");
  const [dataClima, setdataClima] = useState(null);

  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ciudad.length > 0) fetchClima();
  };

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`);
      const data = await response.json();
      setdataClima(data);
    } catch (error) {
      console.log("Ocurrio algun error", error);
    }
  };

  return (
    <div className="container">
      <h1>Aplicacion del clima</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">Buscar</button>
      </form>
      {dataClima && (
        <div>
          <h2>{dataClima.name}</h2>
          <p>Temperatura : {parseInt(dataClima?.main?.temp - difKelvin)}°C </p>
          <p>Clima : {dataClima.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
          />
        </div>
      )}
    </div>
  );
};
