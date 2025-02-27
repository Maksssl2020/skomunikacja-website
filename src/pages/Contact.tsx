import Page from "../animations/Page.tsx";
import FormInput from "../components/input/FormInput.tsx";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { contactFormValidator } from "../validators/ContactFormValidator.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import LocationIcon from "../icons/LocationIcon.tsx";
import PhoneIcon from "../icons/PhoneIcon.tsx";
import AtSymbolIcon from "../icons/AtSymbolIcon.tsx";
import FacebookIcon from "../icons/FacebookIcon.tsx";
import XLogoIcon from "../icons/XLogoIcon.tsx";
import LinkedinLogoIcon from "../icons/LinkedinLogoIcon.tsx";
import AnimatedButtonWithIcon from "../components/button/AnimatedButtonWithIcon.tsx";
import * as React from "react";
import { AnimatedIconProps } from "../types/types.ts";
import AnimatedAElement from "../components/a/AnimatedAElement.tsx";

type SocialMediaIconData = {
  link: string;
  icon: React.ElementType<AnimatedIconProps>;
};

const socialMediaIconsData: SocialMediaIconData[] = [
  {
    link: "https://www.facebook.com/bpl.informacje/",
    icon: FacebookIcon,
  },
  {
    link: "https://x.com/SKOMUNIKACJA",
    icon: XLogoIcon,
  },
  {
    link: "https://www.linkedin.com/company/skomunikacja/posts/?feedView=all",
    icon: LinkedinLogoIcon,
  },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactFormValidator),
  });

  // @ts-ignore
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Page className={"h-[calc(100vh - 75px)] flex justify-center"}>
      <div className={"flex w-[1150px] flex-col items-center gap-16"}>
        <h1 className={"text-white-100 text-5xl"}>Skontaktuj się z nami</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex w-full justify-between gap-8"}
        >
          <div className={"flex flex-col gap-4"}>
            <FormInput
              title={"Nazwa Firmy"}
              type={"text"}
              register={register("companyName")}
              error={errors?.companyName?.message}
            />
            <FormInput
              title={"Adres E-mail"}
              type={"email"}
              register={register("email")}
              error={errors?.email?.message}
            />

            <div className={"flex flex-col gap-4"}>
              <label className={"text-white-100 ml-3 text-2xl"}>
                Wiadomość
              </label>
              <motion.textarea
                whileFocus={{ borderColor: "#3382FF" }}
                animate={
                  errors?.message
                    ? { borderColor: "#FB2C36" }
                    : { borderColor: "#E6E6E6" }
                }
                className={
                  "text-white-100 h-[250px] w-[550px] resize-none rounded-xl border-2 p-2 text-xl outline-none"
                }
                {...register("message")}
              />
              <p className={"h-[35px] pt-3 pl-3 text-lg text-red-500"}>
                {errors?.message && errors?.message?.message}
              </p>
            </div>
          </div>
          <div className={"flex flex-col gap-4"}>
            <FormInput
              title={"Dane Personalne"}
              type={"text"}
              register={register("personalData")}
              error={errors?.personalData?.message}
            />
            <FormInput
              title={"Numer Telefonu"}
              type={"text"}
              register={register("phoneNumber")}
              error={errors?.phoneNumber?.message}
            />
            <motion.button
              whileHover={{
                borderColor: "#3382FF",
                backgroundColor: "#3382FF",
                color: "#111111",
              }}
              type={"submit"}
              className={
                "text-white-100 mt-auto mb-[47px] ml-auto h-[60px] w-[250px] cursor-pointer rounded-lg border-2 text-2xl uppercase"
              }
            >
              Wyślij
            </motion.button>
          </div>
        </form>
        <div
          className={
            "text-white-100 flex w-full flex-col justify-start gap-8 text-2xl"
          }
        >
          <img
            className={"h-auto w-[450px]"}
            src={"/assets/company-logo-large.png"}
            alt={""}
          />
          <div>
            <p className={"font-bold uppercase"}>S Komunikacja</p>
            <p className={"text-gray-200"}>
              Systemy Energetyczne i Telekomunikacyjne
            </p>
          </div>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex gap-6"}>
              <LocationIcon className={"size-8"} />
              <AnimatedAElement address={"ul. Parkowa 12, 64-530 Kaźmierz"} />
            </div>
            <div className={"flex gap-6"}>
              <PhoneIcon className={"size-8"} />
              <p className={"text-gray-200"}>+48 663 391 102</p>
            </div>
            <div className={"flex gap-6"}>
              <AtSymbolIcon className={"size-8"} />
              <div>
                <p className={"flex gap-2"}>
                  <span>Biuro: </span>
                  <AnimatedAElement email={"energia@pomiary.pl"} />
                </p>
                <p className={"flex gap-2"}>
                  <span>Konsultacje techniczne: </span>
                  <AnimatedAElement email={"jacek.kozbial@live.com"} />
                </p>
              </div>
            </div>
            <ul className={"mt-8 flex gap-3"}>
              {socialMediaIconsData.map((data: SocialMediaIconData, index) => (
                <li key={index}>
                  <AnimatedButtonWithIcon Icon={data.icon} link={data.link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Contact;
