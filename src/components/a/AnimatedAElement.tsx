import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedAElementProps = {
  email?: string;
  address?: string;
  link?: string;
  title?: string;
  initialColor?: string;
};

const companyAddressCoordinatesLink =
  "https://www.google.com/maps?q=52.51198033397085, 16.57680830016961";

const AnimatedAElement = ({
  email,
  address,
  link,
  title,
  initialColor = "rgba(230, 230, 230, 0.51)",
}: AnimatedAElementProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const aRef = useRef<HTMLAnchorElement | null>(null);
  let redirectLink;
  let displayValue;

  if (email) {
    redirectLink = `mailto:${email}`;
    displayValue = email;
  } else if (address) {
    redirectLink = companyAddressCoordinatesLink;
    displayValue = address;
  } else if (link && title) {
    redirectLink = link;
    displayValue = title;
  } else if (link) {
    redirectLink = link;
    displayValue = link;
  }

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
        animate={isHovered ? { color: "#3382FF" } : { color: initialColor }}
        transition={{ duration: 0.2 }}
        className={"text-gray-200"}
        href={redirectLink}
        target="_blank"
        ref={aRef}
      >
        {displayValue}
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
