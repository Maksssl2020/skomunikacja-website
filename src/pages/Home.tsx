import Page from "../animations/Page.tsx";
import { motion } from "framer-motion";
import AnimatedButton from "../components/button/AnimatedButton.tsx";

const Home = () => {
  return (
    <Page className={"flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <div className={"flex h-auto w-full"}>
          <div className={"text-white-100 flex w-[600px] flex-col gap-4"}>
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
          <div className={"flex max-w-[550px] flex-col gap-8"}>
            <p className={"text-white-100 text-xl"}>
              Zajmujemy się projektowaniem i wdrażaniem nowoczesnych systemów
              pomiarowych dla mediów energetycznych, wody, gazu i innych.
              Zapewniamy kompleksowe rozwiązania dostosowane do potrzeb
              klientów.
            </p>
            <AnimatedButton
              className={
                "border-white-100 h-[50px] w-full cursor-pointer rounded-xl border-2 text-lg font-bold uppercase"
              }
              content={"Dowiedz Się Więcej"}
            />
          </div>
        </div>
        <div className={"grid h-auto w-full grid-cols-3 gap-4 text-white"}>
          <div className={"flex h-auto w-full flex-col gap-4"}>
            <div
              className={
                "bg-black-200 flex h-auto w-full flex-col gap-8 rounded-xl border-2 px-3 py-6"
              }
            >
              <div className={"flex flex-col"}>
                <img
                  className={"ml-6 h-auto w-[175px]"}
                  src={"/assets/LoRaWANLogoForWebsite.png"}
                  alt={"LoRaWANLogoForWebsite"}
                />
                <p className={"ml-20 text-xl font-bold"}>
                  Komunikacja LoRa<span className={"text-blue-200"}>WAN</span>
                </p>
              </div>
              <p className={"text-[17px]"}>
                Oferujemy usługi związane z{" "}
                <span className={"font-bold text-blue-200"}>LoRaWAN</span>, w
                tym mapy zasięgu, projekty infrastruktury, dostawę bramek,
                sensorów i certyfikowanych urządzeń pomiarowych oraz zarządzanie
                serwerem sieci. Specjalizujemy się także w opracowywaniu
                aplikacji i produkcji sensorów na zamówienie.
              </p>
            </div>
            <div
              className={
                "bg-black-200 flex h-auto w-full flex-col gap-8 rounded-xl border-2 px-3 py-6"
              }
            >
              <div className={"flex items-center justify-center gap-6"}>
                <img
                  className={"h-auto w-[65px]"}
                  src={"/assets/PredictiveMaintenanceIcon.png"}
                  alt={"LoRaWANLogoForWebsite"}
                />
                <p className={"text-xl font-bold"}>
                  <span className={"text-blue-200"}>Predictive</span>{" "}
                  maintenance
                </p>
              </div>
              <p className={"text-[17px]"}>
                Oferujemy projektowanie i wdrażanie systemów predictive
                maintenance, dostawę sensorów oraz rozwiązania do przewidywania
                remontów i wykrywania defektów maszyn. .
              </p>
            </div>
          </div>
          <div className={"flex h-auto w-full flex-col gap-4"}>
            <div
              className={
                "bg-black-200 flex h-auto w-full flex-col gap-8 rounded-xl border-2 px-3 py-6"
              }
            >
              <div className={"flex items-center justify-center gap-6"}>
                <p className={"text-xl font-bold"}>
                  <span className={"text-blue-200"}>Smart</span> Communication
                </p>
                <img
                  className={"h-auto w-[75px]"}
                  src={"/assets/SmartCommunicationIcon.png"}
                  alt={"LoRaWANLogoForWebsite"}
                />
              </div>
              <p className={"text-[17px]"}>
                Oferujemy rozwiązania komunikacyjne:{" "}
                <span className={"font-bold text-blue-200"}>BPL</span>,{" "}
                <span className={"font-bold text-blue-200"}>GSM</span>,{" "}
                <span className={"font-bold text-blue-200"}>NB IoT</span> ,{" "}
                <span className={"font-bold text-blue-200"}>LoRa</span>,
                <span className={"font-bold text-blue-200"}>LoRaWAN</span>,{" "}
                <span className={"font-bold text-blue-200"}>WMBUS</span> oraz
                przedłużanie łącza Ethernet do 3 km, zapewniając niezawodny
                przesył danych w systemach pomiarowych.
              </p>
            </div>
            <div
              className={
                "bg-black-200 flex h-auto w-full flex-col gap-8 rounded-xl border-2 px-3 py-6"
              }
            >
              <div className={"flex items-center justify-center gap-6"}>
                <img
                  className={"h-auto w-[85px]"}
                  src={"/assets/InternetOfThingsLogo.png"}
                  alt={"LoRaWANLogoForWebsite"}
                />
                <p className={"text-xl font-bold"}>Internet of Things</p>
              </div>
              <p className={"text-[17px]"}>
                Oferujemy systemy akwizycji danych z urządzeń pomiarowych oraz
                szeroką gamę konwerterów i terminali, w tym dla interfejsów
                WMBUS, LoRa, NB IoT, RS485, Ethernet oraz protokołów
                IEC62056-21, MODBUS i LoRaWAN.
              </p>
            </div>
          </div>
          <div className={"flex h-auto w-full flex-col gap-4"}>
            <div
              className={
                "bg-black-200 flex h-auto w-full flex-col gap-8 rounded-xl border-2 px-3 py-6"
              }
            >
              <div className={"flex items-center justify-center gap-6"}>
                <img
                  className={"h-auto w-[85px]"}
                  src={"/assets/SmartMeterIcon.png"}
                  alt={"LoRaWANLogoForWebsite"}
                />
                <p className={"text-xl font-bold"}>
                  <span className={"text-blue-200"}>Smart</span> Metering
                </p>
              </div>
              <p className={"text-[17px]"}>
                Oferujemy liczniki energii, wody, gazu i ciepła, analizatory
                parametrów sieci, rejestratory danych, optyczne głowice
                odczytowe, konwertery komunikacyjne oraz oprogramowanie do
                wizualizacji i przetwarzania danych.
              </p>
            </div>
            <div className={"h-[320px] w-full border-2"}></div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Home;
