import React from "react";
import HomeIcon from "../../icons/HomeIcon.tsx";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const currentLocationPathname = location.pathname;

  const headerNavigationData = [
    {
      link: "/",
      data: <HomeIcon className={"size-8 stroke-1"} />,
    },
    {
      link: "/news",
      data: "Nowości",
    },
    {
      link: "/about-us",
      data: "O nas",
    },
    {
      link: "/offer",
      data: "Oferta",
    },
    {
      link: "/products",
      data: "Produkty",
    },
    {
      link: "/tips-and-tricks",
      data: "Tips&Tricks",
    },
    {
      link: "/shop",
      data: "Sklep",
    },
    {
      link: "/contact",
      data: "Kontakt",
    },
  ];

  return (
    <div
      className={
        "relative flex h-[75px] w-full items-center justify-center gap-8 p-2 text-white"
      }
    >
      <motion.h1
        onClick={() => navigate("/")}
        whileHover={{ color: "#3382FF" }}
        className={"absolute left-2 cursor-pointer justify-self-start text-3xl"}
      >
        S Komunikacja
      </motion.h1>
      <nav className={"flex items-center gap-6 text-2xl font-light"}>
        <AnimatePresence mode={"wait"}>
          {headerNavigationData.map(
            (data, index) =>
              currentLocationPathname !== data.link && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={index}
                  onClick={() => navigate(data.link)}
                  whileHover={{ color: "#3382FF" }}
                  className={"cursor-pointer"}
                >
                  {data.data}
                </motion.p>
              ),
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Header;
