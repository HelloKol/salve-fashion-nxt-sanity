import { useState } from "react";

const useDialogBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    open,
    close,
  };
};

export default useDialogBox;
