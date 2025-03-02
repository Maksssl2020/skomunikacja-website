import { motion } from "framer-motion";
import ChevronIcon from "../../icons/ChevronIcon.tsx";
import { useState } from "react";
import * as React from "react";
import { FieldValues, UseFormSetValue } from "react-hook-form";

type CalculatorInputProps<T extends FieldValues> = {
  min: number;
  max: number;
  defaultValue: number;
  numberIncrementDecrementValue: number;
  setValue: UseFormSetValue<T>;
  name: keyof T;
  bgColor?: string;
};

const CalculatorInput = <T extends FieldValues>({
  min,
  max,
  defaultValue,
  numberIncrementDecrementValue,
  setValue,
  name,
  bgColor,
}: CalculatorInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>(defaultValue.toString());

  const handleIncrementDecrementButtonsClick = (action: "inc" | "dec") => {
    setInputValue((prevValue) => {
      const newValue =
        Number(prevValue) +
        (action === "inc"
          ? numberIncrementDecrementValue
          : -numberIncrementDecrementValue);
      const parsedValue = String(Math.min(Math.max(newValue, min), max));
      setValue(
        // @ts-ignore
        name,
        name === "preambleLength"
          ? Number(parsedValue) + 4.25
          : Number(parsedValue),
      );

      return parsedValue;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "-" || /^-?\d*$/.test(newValue)) {
      setInputValue(newValue);
      // @ts-ignore
      setValue(name, Number(newValue));
    }
  };

  const handleBlur = () => {
    const numericValue = Number(inputValue);
    if (isNaN(numericValue)) {
      setInputValue(String(min));
    } else {
      setInputValue(String(Math.min(Math.max(numericValue, min), max)));
    }
    setIsFocused(false);
  };

  return (
    <motion.div
      animate={
        isFocused ? { borderColor: "#3382FF" } : { borderColor: "#E6E6E6" }
      }
      style={{ background: bgColor && bgColor }}
      className={"flex h-[50px] w-[150px] cursor-pointer rounded-lg border-2"}
    >
      <motion.input
        max={max}
        min={min}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        className={"h-full w-[115px] px-2 outline-none"}
        type={"text"}
      />
      <div className={"flex h-full w-[35px] flex-col gap-1 p-1"}>
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
    </motion.div>
  );
};

export default CalculatorInput;
