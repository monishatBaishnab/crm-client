import { useEffect, useState } from "react";

const useIsSmallScreen = (breakpoint = 768) => {
  const [isSmall, setIsSmall] = useState<boolean>(
    () => window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < breakpoint);
    };

    // run once in case the first render happened on the server
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return {isSmall, setIsSmall};
};
export default useIsSmallScreen;
