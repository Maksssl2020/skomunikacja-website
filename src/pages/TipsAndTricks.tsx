import React, { useState } from "react";
import Page from "../animations/Page.tsx";
import Modal from "../components/modal/Modal.tsx";
import { AnimatePresence } from "framer-motion";
import CloseIcon from "./CloseIcon.tsx";

const tipsAndTricksData = [
  {
    title:
      "Transparentne łącze szeregowe w oparciu o dwa terminale LoRa F8L10T",
    description:
      "Za pomocą dwóch terminali LoRa F8L10T można zbudować przeźroczyste łącze szeregowe RS232/485. Terminale F8L10T pozwalają na budowę łącza do 10km w terenie otwartym oraz do 2km w terenie zabudowanym.",
    imagesUrl: ["/assets/TT-RS-First-Tip.png"],
  },
  {
    title: "Niskobudżetowa infrastruktura LoRa",
    description:
      "Terminale F8L10T można skonfigurować do pracy w układzie z centralnym nadajnikiem LoRa. Po połączeniu nadajnika centralnego z routerem GSM uzyskujemy bramkę/gateway LoRaWAN dzięki czemu lokalna komórka LoRa może być obsługiwana za pomocą sieci GSM.",
    imagesUrl: ["/assets/TT-LoRaWAN-Tip-2.png"],
  },
];

type modalDataProp = {
  title: string;
  description: string;
  imagesUrl: [];
};

const TipsAndTricks = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<modalDataProp>({
    title: "",
    description: "",
    // @ts-ignore
    imagesUrl: [""],
  });

  return (
    <Page className={"relative flex justify-center"}>
      <div className={"flex h-[750px] w-[1150px] flex-wrap gap-16"}>
        {tipsAndTricksData.map((data, index) => (
          <div
            onClick={() => {
              // @ts-ignore
              setModalData(data);
              setIsModalOpen(true);
            }}
            key={index}
            className={
              "border-white-100 flex h-[300px] w-[325px] flex-col rounded-xl border-2"
            }
          >
            <img
              className={"h-full w-full rounded-t-lg object-cover"}
              src={data.imagesUrl[0]}
              alt={""}
            />
            <footer className={"text-white-100 mt-auto h-[75px] p-2"}>
              {data.title}
            </footer>
          </div>
        ))}
      </div>

      <AnimatePresence mode={"wait"}>
        {isModalOpen && (
          <Modal>
            <div
              className={
                "bg-black-200 relative flex h-auto min-h-[450px] w-[650px] flex-col gap-8 rounded-xl p-8"
              }
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className={
                  "absolute top-0 right-0 size-10 rounded-full text-white"
                }
              >
                <CloseIcon className={"size-8"} />
              </button>
              <h2 className={"text-white-100 text-xl font-bold"}>
                {modalData.title}
              </h2>
              <textarea
                readOnly={true}
                className={"text-white-100 h-auto w-full outline-none"}
                value={modalData.description}
              />
              <img
                className={"rounded-xl"}
                // @ts-ignore
                src={modalData.imagesUrl[0]}
                alt={""}
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </Page>
  );
};

export default TipsAndTricks;
