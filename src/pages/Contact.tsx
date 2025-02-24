import React from "react";
import Page from "../animations/Page.tsx";
import FormInput from "../components/input/FormInput.tsx";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const Contact = () => {
  const { reset } = useForm();

  return (
    <Page className={"h-[calc(100vh - 75px)]"}>
      <div className={"flex flex-col items-center gap-16"}>
        <h1 className={"text-5xl text-white"}>Skontaktuj się z nami</h1>
        <form className={"flex w-full justify-center gap-8"}>
          <div className={"flex flex-col gap-4"}>
            <FormInput title={"Nazwa Firmy"} type={"text"} />
            <FormInput title={"Adres E-mail"} type={"email"} />

            <div className={"flex flex-col gap-4"}>
              <label className={"ml-3 text-2xl text-white"}>Wiadomość</label>
              <motion.textarea
                whileFocus={{ borderColor: "#3382FF" }}
                className={
                  "h-[250px] w-[550px] resize-none rounded-xl border-2 border-white p-2 text-xl text-white outline-none"
                }
              />
            </div>
          </div>
          <div className={"flex flex-col gap-4"}>
            <FormInput title={"Dane Personalne"} type={"text"} />
            <FormInput title={"Numer Telefonu"} type={"text"} />
            <motion.button
              whileHover={{
                borderColor: "#3382FF",
                backgroundColor: "#3382FF",
                color: "#111111",
              }}
              className={
                "mt-auto ml-auto h-[60px] w-[250px] cursor-pointer rounded-lg border-2 text-2xl text-white uppercase"
              }
            >
              Wyślij
            </motion.button>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default Contact;
