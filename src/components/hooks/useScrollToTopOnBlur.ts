// hooks/useScrollToTopOnBlur.ts
import { useEffect } from "react";

const useScrollToTopOnBlur = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleBlur = (event: FocusEvent) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        scrollToTop();
      }
    };

    document.addEventListener("blur", handleBlur, true);

    return () => {
      document.removeEventListener("blur", handleBlur, true);
    };
  }, []);
};

export default useScrollToTopOnBlur;
