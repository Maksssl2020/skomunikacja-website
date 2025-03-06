import { motion } from "framer-motion";
import { useState } from "react";

type TipsAndTricksCardProps = {
  index: number;
  title: string;
  imageUrl: string;
  imageAlt: string;
  onClick: () => void;
};

const TipsAndTricksCard = ({
  index,
  title,
  imageUrl,
  imageAlt,
  onClick,
}: TipsAndTricksCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      key={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={
        isHovered
          ? { scale: 1.05, borderColor: "#3382FF" }
          : { scale: 1.0, borderColor: "#B0B0B0" }
      }
      onClick={onClick}
      className={
        "bg-black-300 flex h-auto w-full cursor-pointer flex-col rounded-xl border-2 border-gray-100"
      }
    >
      <img
        className={"h-auto w-full rounded-t-xl object-cover"}
        src={imageUrl}
        alt={imageAlt}
      />
      <motion.footer
        animate={
          isHovered ? { borderColor: "#3382FF" } : { borderColor: "#B0B0B0" }
        }
        className={"text-white-100 mt-auto h-[75px] border-t-2 p-2"}
      >
        {title}
      </motion.footer>
    </motion.div>
  );
};

export default TipsAndTricksCard;
