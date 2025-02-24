import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type PageProps = {
  children: ReactNode;
  className?: string;
};

const Page = ({ children, className }: PageProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Page;
