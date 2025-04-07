import React from "react";

// Import images for news articles
import tornadoImage from "./images/Tornado.jpg";
import valenciaImage from "./images/valencia.jpg";
import calorImage from "./images/Calor.jpg";
import MonterreyImage from "./images/Monterrey.jpeg";
import CaliforniaImage from "./images/California.jpg";
import WoodboroImage from "./images/Woodsboro.jpg";

function News() {
  return (
    <div>
      <h2 className="news-title">Notícias</h2>
      <div className="row mt-4">
        {[
          { text: "Tornado Destrói casas no Tenesse", image: tornadoImage },
          { text: "Cheias em Valencia", image: valenciaImage },
          { text: "Onda de Calor em Portugal", image: calorImage },
          { text: "Dias de Praia em Monterrey México", image: MonterreyImage },
          { text: "Caos na Califórnia", image: CaliforniaImage },
          { text: "Cheias em Woodboro causam 78 pessoas desaparecidas", image: WoodboroImage },
        ].map((item, index) => (
          <div key={index} className="col-md-4 mb-3">
            <div className="custom-box">
              <img src={item.image} alt={`Image ${index + 1}`} className="box-image" />
              <p className="box-text">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
