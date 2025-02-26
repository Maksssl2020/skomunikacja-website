import { AnimatedIconProps } from "../types/types.ts";
import { motion } from "framer-motion";

const XLogoIcon = ({ className, isHover }: AnimatedIconProps) => {
  return (
    <motion.svg
      animate={isHover ? { fill: "#3382FF" } : { fill: "#E6E6E6" }}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0,0,256,256"
    >
      <g
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        mix-blend-mode="normal"
      >
        <g transform="scale(10.66667,10.66667)">
          <path d="M2.86719,3l6.86914,9.81836l-7.00195,8.18164h2.64648l5.53906,-6.49023l4.54102,6.49023h5.91016l-7.19727,-10.30273l6.57031,-7.69727h-2.60547l-5.14258,6.00977l-4.19727,-6.00977z"></path>
        </g>
      </g>
    </motion.svg>
  );
};

export default XLogoIcon;
