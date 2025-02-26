import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedAElementProps = {
  email: string;
};

const AnimatedAElement = ({ email }: AnimatedAElementProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const aRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (aRef.current) {
      setWidth(aRef.current.offsetWidth);
    }
  }, []);

  console.log(aRef?.current?.offsetWidth);

  return (
    <div
      className={"h-auto w-fit cursor-pointer"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.a
        animate={
          isHovered
            ? { color: "#3382FF" }
            : { color: "rgba(230, 230, 230, 0.51)" }
        }
        transition={{ duration: 0.2 }}
        className={"text-gray-200"}
        href={`mailto:${email}`}
        ref={aRef}
      >
        {email}
      </motion.a>
      <motion.p
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ width: width }}
        className={`h-[2px] bg-blue-200`}
      ></motion.p>
    </div>
  );
};

export default AnimatedAElement;
