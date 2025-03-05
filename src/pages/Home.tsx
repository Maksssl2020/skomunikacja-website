import Page from "../animations/Page.tsx";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import { JSX } from "react";
import HomeInformationCard from "../components/card/HomeInformationCard.tsx";

type HomeInformationCardProps = {
  title: JSX.Element;
  iconUrl: string;
  description: JSX.Element;
  iconWidth: string;
  iconAlt: string;
};

const homeCardInformationData: HomeInformationCardProps[] = [
  {
    title: (
      <>
        Komunikacja LoRa<span className={"text-blue-200"}>WAN</span>
      </>
    ),
    iconUrl: "/assets/LoRaWANLogoForWebsite.png",
    description: (
      <>
        Oferujemy usługi związane z{" "}
        <span className={"font-bold text-blue-200"}>LoRaWAN</span>, w tym mapy
        zasięgu, projekty infrastruktury, dostawę bramek, sensorów i
        certyfikowanych urządzeń pomiarowych oraz zarządzanie serwerem sieci.
        Specjalizujemy się także w opracowywaniu aplikacji i produkcji sensorów
        na zamówienie.
      </>
    ),
    iconWidth: "w-[175px]",
    iconAlt: "LoRaWANIcon",
  },
  {
    title: (
      <>
        <span className={"text-blue-200"}>Smart</span> Communication
      </>
    ),
    iconUrl: "/assets/SmartCommunicationIcon.png",
    description: (
      <>
        Oferujemy rozwiązania komunikacyjne:{" "}
        <span className={"font-bold text-blue-200"}>BPL</span>,{" "}
        <span className={"font-bold text-blue-200"}>GSM</span>,{" "}
        <span className={"font-bold text-blue-200"}>NB IoT</span> ,{" "}
        <span className={"font-bold text-blue-200"}>LoRa</span>,
        <span className={"font-bold text-blue-200"}>LoRaWAN</span>,{" "}
        <span className={"font-bold text-blue-200"}>WMBUS</span> oraz
        przedłużanie łącza Ethernet do 3 km, zapewniając niezawodny przesył
        danych w systemach pomiarowych.
      </>
    ),
    iconWidth: "w-[75px]",
    iconAlt: "SmartCommunicationIcon",
  },
  {
    title: (
      <>
        <span className={"text-blue-200"}>Smart</span> Metering
      </>
    ),
    iconUrl: "/assets/SmartMeterIcon.png",
    description: (
      <>
        Oferujemy liczniki energii, wody, gazu i ciepła, analizatory parametrów
        sieci, rejestratory danych, optyczne głowice odczytowe, konwertery
        komunikacyjne oraz oprogramowanie do wizualizacji i przetwarzania
        danych.
      </>
    ),
    iconWidth: "w-[75px]",
    iconAlt: "SmartMeterIcon",
  },
  {
    title: (
      <>
        <span className={"text-blue-200"}>Predictive</span> maintenance
      </>
    ),
    iconUrl: "/assets/PredictiveMaintenanceIcon.png",
    description: (
      <>
        Oferujemy projektowanie i wdrażanie systemów predictive maintenance,
        dostawę sensorów oraz rozwiązania do przewidywania remontów i wykrywania
        defektów maszyn. .
      </>
    ),
    iconWidth: "w-[75px]",
    iconAlt: "PredictiveMaintenanceIcon",
  },
  {
    title: (
      <>
        <span className={"font-bold text-blue-200"}>Internet</span> of Things
      </>
    ),
    iconUrl: "/assets/InternetOfThingsLogo.png",
    description: (
      <>
        Oferujemy systemy akwizycji danych z urządzeń pomiarowych oraz szeroką
        gamę konwerterów i terminali, w tym dla interfejsów
        <span className={"font-bold text-blue-200"}>WMBUS</span>,{" "}
        <span className={"font-bold text-blue-200"}>LoRa</span>,{" "}
        <span className={"font-bold text-blue-200"}>NB IoT</span>,{" "}
        <span className={"font-bold text-blue-200"}>RS485</span>,{" "}
        <span className={"font-bold text-blue-200"}>Ethernet</span> oraz
        protokołów{"  "}
        <span className={"font-bold text-blue-200"}>IEC62056-21</span>,{" "}
        <span className={"font-bold text-blue-200"}>MODBUS</span> i{" "}
        <span className={"font-bold text-blue-200"}>LoRaWAN</span>.
      </>
    ),
    iconWidth: "w-[75px]",
    iconAlt: "InternetOfThingsLogo",
  },
  {
    title: (
      <>
        Przedstawiciel na <span className={"text-blue-200"}>Polskę</span>
      </>
    ),
    iconUrl: "/assets/REDZLogo.png",
    description: (
      <>
        Jesteśmy wyłącznym przedstawicielem{" "}
        <span className={"font-bold text-blue-200"}>ZTelemetry Ltd.</span> w
        Polsce, oferując głowice optyczne USB i Bluetooth do odczytu liczników,
        oprogramowanie do analizy danych pomiarowych, routery{" "}
        <span className={"font-bold text-blue-200"}>GSM 3G/LTE</span> oraz
        terminale radiowe{" "}
        <span className={"font-bold text-blue-200"}>LoRa</span> i{" "}
        <span className={"font-bold text-blue-200"}>NB IoT</span>.
      </>
    ),
    iconWidth: "w-[85px]",
    iconAlt: "REDZLogo",
  },
];

const Home = () => {
  const groupedData: HomeInformationCardProps[][] = [[], [], []];
  homeCardInformationData.forEach((data, index) => {
    groupedData[index % 3].push(data);
  });

  return (
    <Page className={"flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <div className={"relative flex h-[400px] w-full"}>
          <div
            className={
              "absolute top-0 left-0 -z-10 flex h-full w-full rounded-xl"
            }
          >
            <div className={"bg-black-100 absolute h-full w-full opacity-85"} />
            <img
              className={"inset-0 h-full w-full rounded-xl object-cover"}
              src={"/assets/BackgroundImage.jpg"}
              alt={""}
            />
          </div>
          <div
            className={
              "text-white-100 flex w-[600px] flex-col gap-4 px-4 py-12"
            }
          >
            <motion.h1
              animate={{
                backgroundPositionX: [
                  "0%",
                  "15%",
                  "35%",
                  "50%",
                  "100%",
                  "50%",
                  "35%",
                  "15%",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className={"animated-text-gradient text-5xl font-bold uppercase"}
            >
              Systemy Pomiarowe
            </motion.h1>
            <p className={"text-xl"}>
              Smart Communication, Smart Metering, Internet of Things
            </p>
          </div>
          <div className={"flex max-w-[550px] flex-col gap-8 px-4 py-12"}>
            <p className={"text-white-100 text-xl"}>
              Zajmujemy się projektowaniem i wdrażaniem nowoczesnych systemów
              pomiarowych dla mediów energetycznych, wody, gazu i innych.
              Zapewniamy kompleksowe rozwiązania dostosowane do potrzeb
              klientów.
            </p>
            <AnimatedButton
              className={
                "border-white-100 mt-auto h-[50px] w-full cursor-pointer rounded-xl border-2 text-lg font-bold uppercase"
              }
              content={"Dowiedz Się Więcej"}
            />
          </div>
        </div>
        <div className={"grid h-auto w-full grid-cols-3 gap-4 text-white"}>
          <AnimatePresence mode={"wait"}>
            {groupedData.map((column, colIndex) => (
              <motion.div
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.5,
                    },
                  },
                  hidden: {},
                }}
                initial={"hidden"}
                animate={"visible"}
                exit={"hidden"}
                transition={{
                  staggerChildren: 0.5,
                }}
                key={colIndex}
                className={"flex h-auto w-full flex-col gap-4"}
              >
                {column.map((data, index) => (
                  <HomeInformationCard
                    key={index}
                    title={data.title}
                    iconUrl={data.iconUrl}
                    description={data.description}
                    iconWidth={data.iconWidth}
                    iconAlt={data.iconAlt}
                    index={index + colIndex}
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Page>
  );
};

export default Home;
