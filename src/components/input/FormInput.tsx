import React from "react";
import { motion } from "framer-motion";

type FormInputProps = {
  title: string;
  type: "text" | "email";
};

const FormInput = ({ title, type }: FormInputProps) => {
  return (
    <div className={"flex flex-col gap-4"}>
      <label className={"ml-3 text-2xl text-white"}>{title}</label>
      <motion.input
        whileFocus={{ borderColor: "#3382FF" }}
        type={type}
        className={
          "h-[65px] w-[550px] rounded-xl border-2 border-white px-2 text-xl text-white outline-none"
        }
      />
    </div>
  );
};

export default FormInput;
