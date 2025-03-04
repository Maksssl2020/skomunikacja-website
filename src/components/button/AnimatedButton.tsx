import { motion } from "framer-motion";

type AnimatedButtonProps = {
  className?: string;
  content: string;
  onClick?: () => void;
};

const AnimatedButton = ({
  className,
  content,
  onClick,
}: AnimatedButtonProps) => {
  return (
    <motion.button
      whileHover={{
        borderColor: "#3382FF",
        background: "#3382FF",
        color: "#101012",
      }}
      style={{
        borderColor: "#E6E6E6",
        background: "#101012",
        color: "#E6E6E6",
      }}
      onClick={onClick}
      className={className}
    >
      {content}
    </motion.button>
  );
};

export default AnimatedButton;
