import { useCallback, useEffect } from "react";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";

interface LightDarkButtomProps {
  toggleDark: boolean;
  changeTheme: () => void;
}

function LightDarkButtom({ toggleDark, changeTheme }: LightDarkButtomProps) {
  const handleClick = useCallback(() => {
    changeTheme();

    const primaryColor = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--primary-color");
    const secondaryColor = getComputedStyle(
      document.documentElement,
    ).getPropertyValue("--secondary-color");

    document.documentElement.style.setProperty(
      "--primary-color",
      secondaryColor,
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      primaryColor,
    );
  }, [changeTheme]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "t") handleClick();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClick]);

  return (
    <div onClick={handleClick}>{toggleDark ? <MoonIcon /> : <SunIcon />}</div>
  );
}

export default LightDarkButtom;
