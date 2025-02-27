import Page from "../animations/Page.tsx";
import { offerData } from "../static-data/offerData.ts";
import { AnimatePresence, motion } from "framer-motion";

const Offer = () => {
  const evenOffers = offerData.filter((_, index) => index % 2 === 0);
  const oddOffers = offerData.filter((_, index) => index % 2 !== 0);

  return (
    <Page className={"flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <h1 className={"text-white-100 text-5xl"}>Oferta</h1>
        <AnimatePresence mode={"wait"}>
          <div className={"flex gap-8"}>
            <motion.ul
              initial={"hidden"}
              animate={"visible"}
              exit={"hidden"}
              transition={{ staggerChildren: 0.2 }}
              className={"flex h-auto w-full list-disc flex-col gap-8"}
            >
              {evenOffers.map((data, index) => (
                <motion.li
                  variants={{
                    visible: { x: 0, opacity: 1 },
                    hidden: { x: -50, opacity: 0 },
                  }}
                  transition={{ duration: 0.8, type: "just" }}
                  className={`text-white-100 text-xl`}
                  key={index}
                >
                  <p>{data}</p>
                </motion.li>
              ))}
            </motion.ul>
            <motion.ul
              initial={"hidden"}
              animate={"visible"}
              exit={"hidden"}
              transition={{ staggerChildren: 0.2 }}
              className={"flex h-auto w-full list-disc flex-col gap-8"}
            >
              {oddOffers.map((data, index) => (
                <motion.li
                  variants={{
                    visible: { x: 0, opacity: 1 },
                    hidden: { x: 50, opacity: 0 },
                  }}
                  transition={{ duration: 0.8, type: "just" }}
                  className={`text-white-100 text-xl`}
                  key={index}
                >
                  <p>{data}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </AnimatePresence>
      </div>
    </Page>
  );
};

export default Offer;
