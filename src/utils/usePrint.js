import { useState } from "react";

export const usePrint = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  window.addEventListener("beforeprint", () => {
    setIsPrinting(true);
  });

  window.addEventListener("afterprint", () => {
    setIsPrinting(false);
  });

  return { isPrinting };
};
