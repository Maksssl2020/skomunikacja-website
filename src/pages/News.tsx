import Page from "../animations/Page.tsx";
import NewsInformationCard from "../components/card/NewsInformationCard.tsx";

type NewsDataProps = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  tags: string[];
  author: string;
  date: string;
};

const newsData: NewsDataProps[] = [
  {
    title: "Woda – wstęp",
    description:
      "Nie tylko samą energią elektryczną człowiek żyje, więc ten artykuł będzie o wodzie, ale „lania wody” w nim nie będzie. Tak po prawdzie człowiek bez energii elektrycznej przeżyje a bez wody po 7 dniach … 😉\n",
    imageUrl: "/assets/WodaWstep.png",
    imageAlt: "WodaWstep",
    author: "WP-Pomiary-Admin",
    date: "10.12.2024",
    tags: ["Remote Metering", "Smart Building", "Woda"],
  },
  {
    title: "LoRaWAN GW MODBUS – bramka sieci LoRaWAN z interfejsem MODBUS TCP",
    description:
      "Bramka LoRaWAN GW MODBUS to idealny produkt do komercyjnego wdrożenia IoT bez konieczności użycia rozwiązań chmurowych. Jego modułowość oraz elastyczne opcje dostosowywania do wymagań klienta pozwalają na elastyczność podczas wdrażania rozwiązania. Dzięki komponentom klasy przemysłowej osiąga wysoki standard niezawodności.",
    imageUrl: "/assets/LoRaWAN-GW-MODBUS.jpg",
    imageAlt: "LoRaWAN-GW-MODBUS",
    author: "WP-Pomiary-Admin",
    date: "10.12.2024",
    tags: ["Smart Building", "Smart City", "Smart Grid", "Smart Metering"],
  },
  {
    title: "System do zdalnego odczytu wodomierzy z nakładką wMBUS",
    description:
      "System współpracuje z wszystkimi urządzeniami pomiarowymi z komunikacją wMBUS dostępnymi na rynku takimi jak: wodomierze, ciepłomierze, podzielniki ciepła, gazomierze, liczniki energii elektrycznej.",
    imageUrl: "/assets/WMBUS-Do-LoRaWAN.jpg",
    imageAlt: "WMBUS-Do-LoRaWAN",
    author: "WP-Pomiary-Admin",
    date: "10.12.2024",
    tags: ["LoRaWAN", "LTE", "LTE-M", "Nbiot"],
  },
];

const News = () => {
  const groupedData: NewsDataProps[][] = [[], [], []];
  newsData.forEach((data, index) => {
    groupedData[index % 3].push(data);
  });

  return (
    <Page className={"flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <h1 className={"text-white-100 text-5xl"}>Nowości</h1>
        <div className={"grid h-auto w-full grid-cols-3 gap-4"}>
          {groupedData.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={"flex h-auto w-full flex-col gap-4"}
            >
              {column.map((data, index) => (
                <NewsInformationCard
                  key={index}
                  title={data.title}
                  description={data.description}
                  newsDate={data.date}
                  newsAuthor={data.author}
                  tags={data.tags}
                  imageUrl={data.imageUrl}
                  imageAlt={data.imageAlt}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default News;
