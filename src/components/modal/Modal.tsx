import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

type modalProps = {
  children: ReactNode;
};

const Modal = ({ children }: modalProps) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={"fixed inset-0 z-10 flex items-center justify-center"}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 backdrop-blur-sm`}
        transition={{ duration: 0.1 }}
      />
      <dialog
        className={
          "z-10 flex h-auto w-auto items-center justify-center bg-transparent"
        }
      >
        {children}
      </dialog>
    </motion.div>,
    document.body,
  );
};

export default Modal;
