import { motion } from "framer-motion";
import { ProductCardProps } from "../../types/types.ts";
import { useNavigate } from "react-router-dom";
import { formatTextIntoLink } from "../../utils/formatTextIntoLink.ts";

const ProductCard = ({
  index,
  title,
  image,
  bgColor,
  imageHeight,
  textColor,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const formattedTitleForUrl = formatTextIntoLink(title);

  return (
    <motion.div
      key={index}
      variants={{
        visible: { x: 0, opacity: 1 },
        hidden: {
          x: index !== undefined && index % 2 === 0 ? -50 : 50,
          opacity: 0,
        },
      }}
      transition={{ duration: 0.8, type: "just" }}
      style={{ background: bgColor }}
      className={
        "relative flex h-[550px] w-[500px] flex-col items-center justify-center gap-12 rounded-xl p-2"
      }
    >
      <p
        style={{ color: textColor }}
        className={"mt-4 w-[350px] text-center text-3xl font-normal"}
      >
        {title}
      </p>
      <motion.button
        onClick={() => navigate(`/products/${formattedTitleForUrl}`)}
        whileHover={{ background: "#171719", color: "#E6E6E6" }}
        style={{ background: "#C6F4ED", color: "#171719" }}
        className={"h-[65px] w-[175px] cursor-pointer rounded-sm text-lg"}
      >
        Sprawdź Więcej
      </motion.button>
      <div className={`bg-black-300 mt-auto h-[200px] w-full rounded-xl`} />
      <img
        className={`absolute bottom-12 w-auto ${imageHeight ? `h-[${imageHeight}px]` : "h-[200px]"}`}
        src={image}
        alt={title}
      />
    </motion.div>
  );
};

export default ProductCard;
