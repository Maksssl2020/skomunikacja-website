import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type SelectProps = {
  dropdownData: string[];
};

const dropdownVariants = {
  open: {
    opacity: 1,
    height: "auto",
  },
  closed: {
    opacity: 0,
    height: 0,
  },
};

const Select = ({ dropdownData }: SelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className={
        "bg-white-100 relative flex h-auto w-[150px] flex-col rounded-lg"
      }
    >
      <div className={"flex"}></div>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ staggerChildren: 0.2 }}
            className={"absolute top-10 w-full rounded-lg bg-blue-100"}
          >
            {dropdownData?.map((data, index) => (
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
                key={index}
                className={"h-[35px] w-full"}
              >
                {data}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
