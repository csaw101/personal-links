import { useRef, useState, useEffect, useCallback } from "react";
import DiceIcon from "../Icons/DiceIcon";

function RandomizerButtom({ toggleDark }: { toggleDark: boolean }) {
  const [shake, setShake] = useState<boolean>(false);

  const getRandomColor = useCallback(() => {
    const colors: [string, string][] = [
      ["#252725", "#f5cb5c"],
      ["#28231d", "#c9c9a9"],
      ["#a00013", "#d8b25d"],
      ["#231942", "#be95c4"],
      ["#450920", "#ffa5ab"],
      ["#042917", "#98aa54"],
      ["#001e30", "#6eaa88"],
    ];

    let randomIndex = Math.floor(Math.random() * colors.length);
    while (isRecentIndex(randomIndex))
      randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  }, []);

  function changeColors(primaryColor: string, secondaryColor: string) {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor,
    );
  }

  const handleClick = useCallback(() => {
    // shake animation
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 300);

    // get colors
    let [secondaryColor, primaryColor] = getRandomColor();
    if (toggleDark === false)
      [primaryColor, secondaryColor] = [secondaryColor, primaryColor];

    changeColors(primaryColor, secondaryColor);
  }, [getRandomColor, toggleDark]);

  useEffect(() => {
    //function getRandomIndex() {
    //  const arrayLength = 4;
    //  const minCeiled = Math.ceil(arrayLength);
    //  const maxFloored = Math.floor(0);
    //  const number = Math.floor(
    //    Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
    //  );
    //  console.log(number);
    //}

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "r") handleClick();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClick]);

  //function getBrightColor() {
  //  const minCeiled = Math.ceil(0xeeaaaa);
  //  const maxFloored = Math.floor(0xffffff);
  //  const number = Math.floor(
  //    Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
  //  );
  //  let colorString = number.toString(16);
  //  while (colorString.length !== 6) colorString = "0" + colorString;
  //  return "#" + colorString;
  //}
  //function getDarkColor() {
  //  const minCeiled = Math.ceil(0x000000);
  //  const maxFloored = Math.floor(0xff0000);
  //  const number = Math.floor(
  //    Math.random() * (maxFloored - minCeiled + 1) + minCeiled,
  //  );
  //  let colorString = number.toString(16);
  //  while (colorString.length !== 6) colorString = "0" + colorString;
  //  return "#" + colorString;
  //}

  const lastThreeIndexesRef = useRef<number[]>([]);
  function isRecentIndex(index: number) {
    if (lastThreeIndexesRef.current.includes(index)) {
      return true;
    }
    lastThreeIndexesRef.current.push(index);
    if (lastThreeIndexesRef.current.length > 3)
      lastThreeIndexesRef.current.shift();
    return false;
  }

  return (
    <div
      onClick={handleClick}
      className={shake ? "randomizer-button shake" : "randomizer-button"}
    >
      <DiceIcon />
    </div>
  );
}

export default RandomizerButtom;
