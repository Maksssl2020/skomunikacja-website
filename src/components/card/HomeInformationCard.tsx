import { JSX } from "react";
import { motion } from "framer-motion";

type HomeInformationCardProps = {
  title: JSX.Element;
  iconUrl: string;
  description: JSX.Element;
  index: number;
  iconWidth: string;
  iconAlt: string;
};

const HomeInformationCard = ({
  title,
  iconUrl,
  description,
  index,
  iconWidth,
  iconAlt,
}: HomeInformationCardProps) => {
  return (
    <motion.div
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: 0.15 * index,
          },
        },
        hidden: {
          opacity: 0,
          y: -20,
        },
      }}
      className={
        "bg-black-300 flex h-auto w-full flex-col gap-8 rounded-xl border-2 border-gray-300 px-3 py-6"
      }
    >
      <div
        className={`flex ${iconAlt.includes("LoRaWAN") ? "flex-col" : "items-center justify-center gap-4"} ${index % 2 !== 0 && "flex-row-reverse"}`}
      >
        <img
          className={`h-auto ${iconWidth} ${iconAlt.includes("LoRaWAN") && "ml-6"}`}
          src={iconUrl}
          alt={iconAlt}
        />
        <p
          className={`text-xl font-bold ${iconAlt.includes("LoRaWAN") && "ml-20"}`}
        >
          {title}
        </p>
      </div>
      <p className={"text-[17px]"}>{description}</p>
    </motion.div>
  );
};

export default HomeInformationCard;
