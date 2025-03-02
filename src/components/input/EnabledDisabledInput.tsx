import { useState } from "react";
import { motion } from "framer-motion";
import ChevronIcon from "../../icons/ChevronIcon.tsx";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type EnabledDisabledInputProps<T extends FieldValues> = {
  setValue: UseFormSetValue<T>;
  name: keyof T;
  bgColor?: string;
  textColor?: "#E6E6E6" | "#171719";
};

const EnabledDisabledInput = <T extends FieldValues>({
  setValue,
  name,
  bgColor,
  textColor = "#E6E6E6",
}: EnabledDisabledInputProps<T>) => {
  const [inputValue, setInputValue] = useState<number>(1);

  const handleIncrementDecrementButtonsClick = (action: "inc" | "dec") => {
    setInputValue(action === "inc" ? 1 : 0);
    // @ts-ignore
    setValue(name, action === "inc");
  };

  return (
    <div
      style={{ background: bgColor && bgColor, color: textColor }}
      className={
        "flex h-[50px] w-[150px] cursor-pointer rounded-lg border-2 border-white"
      }
    >
      <motion.input
        max={1}
        min={0}
        value={inputValue === 0 ? "Disabled" : "Enabled"}
        className={"h-full w-[115px] px-2 outline-none"}
        type={"text"}
      />
      <div className={"text-white-100 flex h-full w-[35px] flex-col gap-1 p-1"}>
        <motion.button
          whileHover={{ background: "#3382FF" }}
          style={{ background: "#0A0A0C" }}
          onClick={() => handleIncrementDecrementButtonsClick("inc")}
          className={
            "flex h-[20px] w-full cursor-pointer items-center justify-center rounded-md"
          }
        >
          <ChevronIcon className={"size-4 rotate-180"} />
        </motion.button>
        <motion.button
          whileHover={{ background: "#3382FF" }}
          style={{ background: "#0A0A0C" }}
          onClick={() => handleIncrementDecrementButtonsClick("dec")}
          className={
            "flex h-[20px] w-full cursor-pointer items-center justify-center rounded-md"
          }
        >
          <ChevronIcon className={"size-4"} />
        </motion.button>
      </div>
    </div>
  );
};

export default EnabledDisabledInput;
