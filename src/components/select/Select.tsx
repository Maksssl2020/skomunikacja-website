import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedChevronIcon from "../../icons/AnimatedChevronIcon.tsx";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type SelectProps<T extends FieldValues> = {
  dropdownData: string[];
  setValue: UseFormSetValue<T>;
  name: keyof T;
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

const Select = <T extends FieldValues>({
  dropdownData,
  setValue,
  name,
}: SelectProps<T>) => {
  const [selectedOption, setSelectedOption] = useState<string>(dropdownData[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <motion.div
      whileHover={{ borderColor: "#3382FF" }}
      style={{ borderColor: "#E6E6E6" }}
      ref={selectRef}
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className={
        "relative flex h-[50px] w-[150px] cursor-pointer flex-col rounded-lg border-2"
      }
    >
      <div className={"flex h-full w-full items-center px-2"}>
        {selectedOption}
        <AnimatedChevronIcon
          isElementOpen={isDropdownOpen}
          className={"ml-auto size-6"}
        />
      </div>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ staggerChildren: 0.2 }}
            className={
              "bg-black-100 absolute top-12 z-10 w-full rounded-lg border-2 p-1"
            }
          >
            {dropdownData?.map((data, index) => (
              <motion.li
                whileHover={{ background: "#3382FF" }}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    background: selectedOption === data ? "#3382FF" : "#0A0A0C",
                  },
                }}
                onClick={() => {
                  setSelectedOption(data);
                  // @ts-ignore
                  setValue(name, data);
                  setIsDropdownOpen(false);
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
                key={index}
                className={
                  "h-[35px] w-full cursor-pointer rounded-md px-2 py-1"
                }
              >
                {data}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Select;
