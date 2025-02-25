import HomeIcon from "../../icons/HomeIcon.tsx";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
        "bg-black-200 relative flex h-[100px] w-full items-center justify-center gap-8 p-2 text-gray-200"
      }
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        onClick={() => navigate("/")}
        className={
          "absolute left-4 flex size-[70px] cursor-pointer items-center justify-center rounded-full"
        }
      >
        <img
          src={"/assets/company-logo-small.png"}
          alt={""}
          className={"size-[65px] justify-self-start"}
        />
      </motion.div>

      <nav className={"flex items-center gap-6 text-2xl font-light"}>
        {headerNavigationData.map((data, index) => (
          <motion.p
            animate={
              currentLocationPathname === data.link
                ? { color: "#E6E6E6" }
                : { color: "#7D7D7E" }
            }
            key={index}
            onClick={() => navigate(data.link)}
            whileHover={{ color: "#E6E6E6" }}
            className={"cursor-pointer"}
          >
            {data.data}
          </motion.p>
        ))}
      </nav>
    </div>
  );
};

export default Header;
