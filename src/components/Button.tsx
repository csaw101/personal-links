import "../styles/Button.css";
import "../styles/Icons.css";
import LinkIcon from "../Icons/LinkIcon";

function Button({
  name,
  Icon,
  link,
}: {
  name: string;
  Icon: React.ComponentType;
  link: string;
}) {
  return (
    <a className="button" href={link}>
        <Icon />
        <div className="button-text">{name}</div>
        <LinkIcon />
    </a>
  );
}

export default Button;
