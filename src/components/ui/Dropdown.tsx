import { ReactNode } from "react";

type ListItem = {
  title: string;
  icon: ReactNode;
  path: string;
};

type Props = {
  clickable: ReactNode;
  options: Array<ListItem>;
};

function Dropdown({ clickable, options }: Props) {
  return (
    <details className="dropdown">
      <summary className="list-none m-0 p-0 cursor-pointer">
        {clickable}
      </summary>
      <ul className="menu dropdown-content bg-primaryDark rounded-box z-[1] w-52 p-2 shadow">
        {options &&
          options.map((option, index) => (
            <li key={index}>
              <a className="flex items-center gap-2">
                {option.icon} {/* Display the icon */}
                {option.title} {/* Display the title */}
              </a>
            </li>
          ))}
      </ul>
    </details>
  );
}

export default Dropdown;
