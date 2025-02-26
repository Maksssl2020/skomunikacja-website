import { motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { AnimatedIconProps } from "../../types/types.ts";

type AnimatedButtonWithIconProps = {
  Icon: React.ElementType<AnimatedIconProps>;
  link: string;
};

const AnimatedButtonWithIcon = ({
  Icon,
  link,
}: AnimatedButtonWithIconProps) => {
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  const handleButtonClick = () => {
    window.open(link, "_blank");
  };

  return (
    <motion.button
      whileHover={{ borderColor: "#3382FF", scale: 1.1 }}
      onClick={handleButtonClick}
      onMouseEnter={() => setIsButtonHovered(true)}
      onMouseLeave={() => setIsButtonHovered(false)}
      transition={{ duration: 0.2 }}
      className={
        "bg-black-300 flex size-14 cursor-pointer items-center justify-center rounded-full border-[2px]"
      }
    >
      <Icon className={"fill-white-100 size-8"} isHover={isButtonHovered} />
    </motion.button>
  );
};

export default AnimatedButtonWithIcon;
