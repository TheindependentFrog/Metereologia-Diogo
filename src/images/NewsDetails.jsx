import { useParams } from "react-router-dom";

const newsData = {
  1: { title: "Tornado Destrói casas no Tenesse", text: "Um tornado devastador atingiu o estado do Tenesse, destruindo várias casas e deixando centenas de desalojados..." },
  2: { title: "Cheias em Valencia", text: "A cidade de Valencia foi atingida por fortes chuvas, causando inundações em diversas áreas e prejuízos milionários..." },
  3: { title: "Onda de Calor em Portugal", text: "Portugal enfrenta uma onda de calor intensa, com temperaturas que ultrapassam os 40°C em algumas regiões..." },
  4: { title: "Dias de Praia em Monterrey México", text: "Monterrey tem aproveitado dias ensolarados e praias lotadas, atraindo turistas e impulsionando o turismo local..." },
  5: { title: "Caos na Califórnia", text: "A Califórnia enfrenta uma crise com incêndios florestais e quedas de energia, afetando milhares de pessoas..." },
  6: { title: "Cheias em Woodboro causam 78 pessoas desaparecidas", text: "As chuvas torrenciais em Woodboro causaram inundações devastadoras, com 78 pessoas ainda desaparecidas..." },
};

export default function NewsDetails() {
  const { id } = useParams();
  const news = newsData[id];

  return (
    <div style={{ padding: "20px" }}>
      <h1>{news?.title}</h1>
      <p>{news?.text}</p>
    </div>
  );
}
