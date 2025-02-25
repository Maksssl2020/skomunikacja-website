import React from "react";
import { motion } from "framer-motion";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  title: string;
  type: "text" | "email";
  error?: string;
  register?: UseFormRegisterReturn<string>;
};

const FormInput = ({ title, type, error, register }: FormInputProps) => {
  return (
    <div className={"flex flex-col gap-4"}>
      <label className={"text-white-100 ml-3 text-2xl"}>{title}</label>
      <motion.input
        whileFocus={{ borderColor: "#3382FF" }}
        animate={
          error ? { borderColor: "#FB2C36" } : { borderColor: "#E6E6E6" }
        }
        type={type}
        className={
          "text-white-100 h-[65px] w-[550px] rounded-xl border-2 px-2 text-xl outline-none"
        }
        {...register}
      />
      <p className={"h-[35px] pt-3 pl-3 text-lg text-red-500"}>
        {error && error}
      </p>
    </div>
  );
};

export default FormInput;
