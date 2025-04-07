import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import places from "places.js";
import moment from "moment";
import "moment/locale/fr";
import WeatherMap from './WeatherMap'; // adjust path if needed
import "leaflet/dist/leaflet.css";

// Import the images

import calorImage from "./images/Calor.jpg";
import tornadoImage from "./images/Tornado.jpg";
import valenciaImage from "./images/valencia.jpg";
import CaliforniaImage from "./images/California.jpg";
import MonterreyImage from "./images/Monterrey.jpeg";
import WoodboroImage from "./images/Woodsboro.jpg";
import News from "./News";  // Import News component
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [lastSearchedCities, setLastSearchedCities] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // Para abrir/fechar o menu
  const [currentPage, setCurrentPage] = useState("home"); // Armazena a página selecionada
  const [selectedNews, setSelectedNews] = useState(null);  // To store the clicked news item
  const [alerts, setAlerts] = useState([]);

  const key = "e9832033bf85852728b32863ef646933";

  useEffect(() => {
    getPlaces();
    // Load last searched cities from localStorage
    const savedCities = JSON.parse(localStorage.getItem("lastSearchedCities")) || [];
    setLastSearchedCities(savedCities);
  }, []);
  

  const getPlaces = () => {
    let placesAutocomplete = places({
      appId: "pl84BDTK7HU7",
      apiKey: "671cd803cf905b98ff3217c773e5207a",
      container: document.querySelector("#address-input"),
    });

    placesAutocomplete.on("change", function (e) {
      setCity(e.suggestion.name);
      getWeather(e.suggestion.name);
    });
  };

  const getWeather = async (selectedCity) => {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${key}&units=metric`;
  
    try {
      const response = await fetch(apiURL);
      const resData = await response.json();
  
      if (resData.cod !== 200) throw new Error(resData.message);
  
      setWeather({
        city: resData.name,
        temperature: `${Math.round(resData.main.temp)}˚C`,
        humidity: resData.main.humidity,
        summary: resData.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${resData.weather[0].icon}@2x.png`,
        lat: resData.coord.lat,
        lon: resData.coord.lon,
      });
  
 
      // Update last searched cities
      updateLastSearchedCities(selectedCity);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };
  

  

  const convertTimestamp = (time) => {
    let day = moment.unix(time).locale("fr").utc();
    return day.format("dddd MMM Do");
  };

  const handleSearch = () => {
    if (city) {
      getWeather(city);
    }
  };

  const updateLastSearchedCities = (city) => {
    let updatedCities = [...lastSearchedCities];
    // Prevent duplicate cities
    if (!updatedCities.includes(city)) {
      updatedCities.unshift(city);
      if (updatedCities.length > 3) updatedCities.pop(); // Keep only the last 3 cities
      setLastSearchedCities(updatedCities);
      // Save the updated list to localStorage
      localStorage.setItem("lastSearchedCities", JSON.stringify(updatedCities));
    }
  };
  const newsData = [
    {
      text: "Tornado Destrói casas no Tennessee",
      image: tornadoImage,
      details: "Um tornado devastador atingiu o estado do Tennessee, nos Estados Unidos, causando destruição em várias localidades. O fenómeno meteorológico trouxe consigo ventos fortes e danos significativos, destruindo casas e infraestruturas essenciais. Muitas famílias ficaram desabrigadas e perderam tudo o que tinham em questão de minutos."
    },
    {
      text: "Cheias em Valencia",
      image: valenciaImage,
      details: "Valência foi severamente afetada por fortes chuvas nas últimas horas, que provocaram inundações generalizadas em várias áreas da cidade. As águas subiram rapidamente, inundando ruas, casas e estabelecimentos comerciais, causando grandes danos materiais e deixando muitas pessoas desalojadas."
    },
    {
      text: "Onda de Calor em Portugal",
      image: calorImage,
      details: "Portugal está passando por uma onda de calor recorde, com temperaturas acima de 40°C em várias partes do país. As autoridades emitiram alertas de saúde, recomendando precauções para evitar desidratação, insolação e outros problemas relacionados ao calor extremo. As regiões mais afetadas incluem o sul do país, onde os termômetros chegaram a registrar valores históricos, e também algumas áreas no interior, onde as condições climáticas são mais severas."
    },
    {
      text: "Dias de Praia em Monterrey, México",
      image: MonterreyImage,
      details: "Monterrey, uma das principais cidades do norte do México, experimenta dias ensolarados e agradáveis, com temperaturas ideais para quem deseja aproveitar a estação. A cidade, conhecida por sua proximidade com as montanhas e paisagens naturais impressionantes, se transforma durante este período, atraindo turistas de diversas partes do mundo."
    },
    {
      text: "Caos na Califórnia",
      image: CaliforniaImage,
      details: "A Califórnia está, mais uma vez, enfrentando uma crise ambiental devido a uma combinação de incêndios florestais devastadores e quedas de energia generalizadas, causadas por temperaturas extremamente altas. O estado tem sido um epicentro de calor recorde nos últimos dias, com muitos locais alcançando temperaturas acima de 40°C, o que tem exacerbado a situação já crítica dos incêndios."
    },
    {
      text: "Cheias em Woodsboro causam 78 pessoas desaparecidas",
      image: WoodboroImage,
      details: "A cidade de Woodsboro, localizada em uma região propensa a eventos climáticos extremos, foi gravemente afetada por fortes chuvas que caíram nas últimas 24 horas. As intensas precipitações causaram inundações maciças, submergindo ruas, casas e outros edifícios em várias áreas da cidade. O nível da água subiu rapidamente, tornando impossível para os moradores escaparem em tempo hábil, resultando em um cenário de destruição generalizada, causando 78 pessoas desaparecidas."


    }
  ];

  return (
    <div>
      <div className="weather-header">
      <div className="logo-title-wrapper">
  <img src={require("./images/logo.jpg")} alt="Logo" className="logo-image" />
  <h1 className="weather-title">Umbrella Forecast</h1>
</div>

{/* Menu Button */}
<div className="menu-wrapper"> 
<button onClick={() => { 
  setMenuOpen(!menuOpen); 
  console.log("Menu Open State:", !menuOpen); // Eu consegui colocar o menu mas acabei por tirar por não conseguir com que as paginas mudassem
}} className="menu-button"></button>


          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => { setCurrentPage("home"); setMenuOpen(false); }}>Home</button>
              <button onClick={() => { setCurrentPage("news"); setMenuOpen(false); }}>News</button>
              <button onClick={() => { setCurrentPage("map"); setMenuOpen(false); }}>Map</button>
            </div>
          )}
        </div>
      </div>
      

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id="address-input"
          type="text"
          value={city}
          placeholder="Enter a city"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </button>
        

        {/* Last 3 Searched Cities next to the Search Button */}
        <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {lastSearchedCities.map((city, index) => (
            <button
              key={index}
              onClick={() => getWeather(city)}
              style={{
                margin: '5px 0',
                backgroundColor: '#1e90ff',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '5px',
                fontSize: '0.9rem',
                width: '150px',
              }}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
      {currentPage === "map" && <WeatherMap />}   
      {weather && (
        <div>
          <h2>{weather.city}</h2>
          <p>{weather.temperature}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>{weather.summary}</p>
          <img src={weather.icon} alt="Weather icon" />
        </div>
      )}

{forecast.length > 0 && (
  <div className="forecast-wrapper">
    <h2 className="news-title">Prévisions sur 8 jours</h2>
    <div className="forecast-container">
      {forecast.map((day, index) => (
        <div className="forecast-card" key={index}>
          <p className="forecast-date">{convertTimestamp(day.dt)}</p>
          <img
            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
            className="forecast-icon"
          />
          <p className="forecast-temp">{Math.round(day.temp.day)}˚C</p>
          <p className="forecast-desc">{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  </div>
)}

      {/* News Section */}
      {selectedNews && (
  <div className="news-detail">
    <h2 style={{ color: "black" }}>{selectedNews.text}</h2> {/* Título da notícia em preto */}
    
    <img src={selectedNews.image} alt="News image" className="news-detail-image" />
    
    {/* Detalhes da notícia dentro de uma caixa de texto */}
    <textarea
      value={selectedNews.details}
      readOnly
      style={{
        width: "100%",
        height: "200px",
        padding: "10px",
        marginTop: "20px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        fontFamily: "Arial, sans-serif",
      }}
    />

    <button onClick={() => setSelectedNews(null)} style={{ marginTop: '20px' }}>
      Back
    </button>
  </div>
)}




      <h2 className="news-title">Notícias</h2>
      <div className="row mt-4">
  {newsData.map((item, index) => (
    <div key={index} className="col-md-4 mb-3">
      <div
        className="custom-box"
        onClick={() => {
          console.log("News item clicked:", item); // Verifique os dados da notícia
          setSelectedNews(item); // Atualiza o estado com os dados da notícia
        }}
      >
        <img src={item.image} alt={`Image ${index + 1}`} className="box-image" />
        <p className="box-text">{item.text}</p>
      </div>
    </div>
  ))}
</div>


      <style jsx>{`
        .weather-title {
          font-size: 3rem;
          font-weight: bold;
          text-align: center;
          color: #fff;
          background-color: #1e90ff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          margin-bottom: 30px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .forecast-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
           margin-top: 20px; 
        }
        .forecast-item {
          text-align: center;
          width: 150px;
          padding: 10px;
          margin: 10px;
          background-color: #f4f4f4;
          border-radius: 10px;
        }
        .forecast-item p {
          margin: 5px 0;
        }
        .news-title {
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 15px;
        }
        .box-image {
          max-width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 5px;
        }
        .box-text {
          margin-top: 10px;
          font-size: 1.2rem;
          font-weight: bold;
          color: black;
        }
        .custom-box {
          border: 2px solid #ddd;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
          background-color: rgb(255, 255, 255);
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
          .weather-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e90ff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
}

.logo-title-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.weather-title {
  font-size: 3rem;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
}

.logo-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.menu-wrapper {
  position: relative;
}

.menu-button {
  font-size: 2rem;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  padding: 10px;
  display: flex;
  flex-direction: column;
  min-width: 120px;
}
.dropdown-menu button {
  background: none;
  border: none;
  text-align: left;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
}

.dropdown-menu button:hover {
  background-color: #1e90ff;
  color: white;
}

  .news-detail {
    margin-top: 30px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .news-detail h2 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .news-detail p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  .news-detail-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }
  .news-detail button {
    padding: 10px 20px;
    background-color: #1e90ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .news-detail button:hover {
    background-color: #004d99;
  }






      `}</style>
    </div>
  );
}

export default App;
