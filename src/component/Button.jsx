const bgButton = {
  blue: "bg-[#415F6C]",
  yellow: "bg-[#E7FE59]",
  lightYellow: "bg-[#FDFFEE]",
  red: "bg-[#F86158]",
  lightBlue: "bg-[#E5ECF0]",
  orange: "bg-[#FF7F50]",
  green: "bg-[#22C55E]"
};

const borderButton = {
  yellow: "border-solid border-2 border-[#C1D547]",
  blue: "border-solid border-2 border-[#415F6C]",
  orange: "border-solid border-2 border-[#FF7F50]"
};

const textColor = {
  white: "text-[#FFFFFF]",
  black: "text-[#0D1618]",
  gray: "text-[#40565C]",
};

export default function Button({
  children,
  bg = "blue",
  border,
  color = "black",
  className = "",
  onClick,
  type,
  fontSize = "text-base",
  fontWeight = "font-normal",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${bgButton[bg]} ${
        border ? borderButton[border] : ""
      } ${textColor[color]} ${fontSize} ${fontWeight} ${className}`}
    >
      {children}
    </button>
  );
}
