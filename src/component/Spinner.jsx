import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Spinner() {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-[#E5ECF0] flex justify-center items-center z-50'>
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className='text-6xl text-[#415F6C]'
      />
    </div>
  );
}
