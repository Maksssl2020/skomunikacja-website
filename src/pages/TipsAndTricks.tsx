import { useEffect, useRef, useState } from "react";
import Page from "../animations/Page.tsx";
import Modal from "../components/modal/Modal.tsx";
import { AnimatePresence } from "framer-motion";
import CloseIcon from "./CloseIcon.tsx";
import { motion } from "framer-motion";

type TipsAndTricksProps = {
  title: string;
  description: string;
  imagesUrl: string[];
};

const tipsAndTricksData: TipsAndTricksProps[] = [
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
  {
    title: "Kalkulator bitrate LoRa",
    description: "",
    imagesUrl: [],
  },
];

const TipsAndTricks = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<TipsAndTricksProps>({
    title: "",
    description: "",
    imagesUrl: [""],
  });
  const [textAreaHeight, setTextAreaHeight] = useState<number>(0);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      setTextAreaHeight(textAreaRef.current.scrollHeight);
    }
  }, [modalData, textAreaRef]);

  return (
    <Page className={"relative flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <h1 className={"text-white-100 text-5xl"}>Tips & Tricks</h1>
        <div className={"flex h-[750px] w-[1150px] flex-wrap gap-16"}>
          {tipsAndTricksData.map((data, index) => (
            <motion.div
              whileHover={{ scale: 1.1, borderColor: "#3382FF" }}
              onClick={() => {
                setModalData(data);
                setIsModalOpen(true);
              }}
              key={index}
              className={
                "border-white-100 flex h-[300px] w-[325px] cursor-pointer flex-col rounded-xl border-2"
              }
            >
              <img
                className={"h-full w-full rounded-t-xl object-cover"}
                src={data.imagesUrl[0]}
                alt={""}
              />
              <footer className={"text-white-100 mt-auto h-[75px] p-2"}>
                {data.title}
              </footer>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence mode={"wait"}>
        {isModalOpen && (
          <Modal>
            <div
              className={
                "bg-black-200 relative flex h-auto min-h-[450px] w-[650px] flex-col gap-8 rounded-xl p-8"
              }
            >
              <motion.button
                whileHover={{ color: "#3382FF", scale: 1.15 }}
                onClick={() => setIsModalOpen(false)}
                className={
                  "absolute top-0 right-0 size-12 cursor-pointer rounded-full text-white"
                }
              >
                <CloseIcon className={"size-10"} />
              </motion.button>
              <h2 className={"text-white-100 text-xl font-bold"}>
                {modalData.title}
              </h2>
              <textarea
                ref={textAreaRef}
                readOnly={true}
                style={{ height: textAreaHeight }}
                className={
                  "text-white-100 h-auto w-full resize-none outline-none"
                }
                value={modalData.description}
              />
              <img
                className={"rounded-xl"}
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
