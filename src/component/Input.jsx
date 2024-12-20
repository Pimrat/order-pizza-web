const bgInput = {
  lightBlue: "bg-[#E5ECF0]",
  none: "bg-transparent",
};

const borderInput = {
  blue: "border-solid border-2 border-[#273941]",
  black: "border-solid border-2 border-[#26363A]",
  orange: "border-solid border-2 border-[#FF7F50]",
  lightSkyBule: "border-solid border-2 border-[#87CEFA]"
};

const textColor = {
  blue: "placeholder-[#73979F]",
  black: "placeholder-[#0D1316]",
};

export default function Input({
  placeholder,
  type = "text",
  name,
  border,
  bg = "lightBlue",
  text,
  value,
  onChange,
  error,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-2 py-2 rounded-xl ${bgInput[bg]} ${
          borderInput[border]
        } ${textColor[text]} focus:outline-none  ${
          error ? "border-[#F86158]" : "border-[#627B86]"
        }`}
      />
      {error ? <small className='text-[#A43C36]  -mt-3'>{error}</small> : null}
    </>
  );
}
