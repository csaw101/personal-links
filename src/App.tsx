import { useEffect, useRef, useState } from "react";
import Button from "./components/Button";
import RandomizerButtom from "./components/RandomizerButtom";
import LightDarkButtom from "./components/LightDarkButtom";
import GitHubIcon from "./Icons/GitHubIcon";
import LinkedInIcon from "./Icons/LinkedInIcon";
import BehanceIcon from "./Icons/BehanceIcon";
import "./App.css";

function App() {
  const [toggleDark, setToggleDark] = useState(false);
  function changeTheme() {
    setToggleDark(!toggleDark);
  }
  const gitUrl = import.meta.env.VITE_GITHUB;
  const linkedinUrl = import.meta.env.VITE_LINKEDIN;
  const behanceUrl = import.meta.env.VITE_BEHANCE;
  const name = import.meta.env.VITE_NAME;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current)
      containerRef.current.style.setProperty("transform", "translateX(0)");
  }, []);

  const buttons = [
    {
      name: "Github",
      Icon: GitHubIcon,
      link: gitUrl,
    },
    {
      name: "LinkedIn",
      Icon: LinkedInIcon,
      link: linkedinUrl,
    },
    {
      name: "Behance",
      Icon: BehanceIcon,
      link: behanceUrl,
    },
  ];

  return (
    <div className="main">
      <div className="bio">
        Hello, I am {name},
        <br /> a front-end developer,
        <br />
        check some of my work here.
      </div>
      <div className="button-container" ref={containerRef}>
        {buttons.map((button) => {
          return (
            <Button
              name={button.name}
              Icon={button.Icon}
              link={button.link}
              key={button.name}
            />
          );
        })}
      </div>
      <div className="theme-buttons">
        <RandomizerButtom toggleDark={toggleDark} />
        <LightDarkButtom toggleDark={toggleDark} changeTheme={changeTheme} />
      </div>
    </div>
  );
}

export default App;
