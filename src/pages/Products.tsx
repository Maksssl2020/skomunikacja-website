import Page from "../animations/Page.tsx";
import { ProductCardProps } from "../types/types.ts";
import ProductCard from "../components/card/ProductCard.tsx";
import { AnimatePresence, motion } from "framer-motion";

const productsData: ProductCardProps[] = [
  {
    title: "LKM144 – konwerter protokołu IEC62056-21 na protokół MODBUS RTU",
    image: "/assets/LKM141.png",
    bgColor: "#EBCB2C",
    textColor: "#171719",
  },
  {
    title: "STG seria WMbus - Protokół bramek Modbus z MQTT",
    image: "/assets/STG-Series.png",
    bgColor: "#0E7565",
    imageHeight: 250,
    textColor: "#E6E6E6",
  },
  {
    title: "TLM seria modemów LoRa i LoRaWAN EndNode",
    image: "/assets/TLM-Series.png",
    bgColor: "#E25225",
    imageHeight: 250,
    textColor: "#E6E6E6",
  },
  {
    title: "BSB seria przemysłowych, niezarządzanych switchy Ethernet",
    image: "/assets/BSB-Series.png",
    bgColor: "#1559CB",
    imageHeight: 200,
    textColor: "#E6E6E6",
  },
  {
    title:
      "CKL seria Modbus TCP i RTU bramek oraz portu szeregowego do Ethernet ",
    image: "/assets/CKL-Series.png",
    bgColor: "#CB333E",
    imageHeight: 250,
    textColor: "#E6E6E6",
  },
  {
    title:
      "MBC141/144 – automatyczny przełącznik prędkości dla urządzeń z protokołem IEC62056-21",
    image: "/assets/MBC-141-144.png",
    bgColor: "#AEE629",
    imageHeight: 200,
    textColor: "#171719",
  },
  {
    title: "Zestaw dydaktyczny do wdrożenia instalacji LoRaWAN",
    image: "/assets/LORAWAN-Training-Set.png",
    bgColor: "#1ABC9C",
    imageHeight: 250,
    textColor: "#171719",
  },
];

const Products = () => {
  return (
    <Page className={"flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <h1 className={"text-white-100 text-5xl"}>Produkty</h1>
        <AnimatePresence mode={"wait"}>
          <motion.ul
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            transition={{ staggerChildren: 0.2 }}
            className={"flex w-[1050px] flex-wrap justify-between gap-8"}
          >
            {productsData.map((data, index) => (
              <ProductCard
                key={index}
                index={index}
                title={data.title}
                image={data.image}
                bgColor={data.bgColor}
                imageHeight={data.imageHeight}
                textColor={data.textColor}
              />
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </Page>
  );
};

export default Products;
