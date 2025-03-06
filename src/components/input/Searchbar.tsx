import SearchIcon from "../../icons/SearchIcon.tsx";
import { motion } from "framer-motion";
import { useState } from "react";

const Searchbar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <motion.div
      animate={
        isFocused ? { borderColor: "#3382FF" } : { borderColor: "#B0B0B0" }
      }
      className={
        "ml-auto flex h-full w-[300px] rounded-lg border-2 border-gray-300"
      }
    >
      <motion.label
        animate={isFocused ? { color: "#3382FF" } : { color: "#E6E6E6" }}
        className={"flex h-full w-[50px] items-center justify-center"}
      >
        <SearchIcon className={"size-8"} />
      </motion.label>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={
          "text-white-100 h-full w-[250px] rounded-r-lg px-1 outline-none"
        }
      />
    </motion.div>
  );
};

export default Searchbar;
