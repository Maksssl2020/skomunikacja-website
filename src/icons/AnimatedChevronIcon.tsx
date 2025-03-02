import { motion } from "framer-motion";

type ChevronIconProps = {
  className?: string;
  isElementOpen?: boolean;
};

const AnimatedChevronIcon = ({
  className,
  isElementOpen,
}: ChevronIconProps) => {
  return (
    <motion.svg
      animate={isElementOpen ? { rotate: 180 } : { rotate: 0 }}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </motion.svg>
  );
};

export default AnimatedChevronIcon;
