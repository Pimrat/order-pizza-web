import { createPortal } from "react-dom";

export default function Modal({ width = 28, title, open, onClose, children }) {
  return createPortal(
    open ? (
      <>
        <div className='fixed inset-0 bg-[#F8FCFF] opacity-50 z-30'></div>
        <div className='fixed inset-0 z-50 ' onMouseDown={onClose}>
          <div className='flex justify-center items-center min-h-screen'>
            <div
              className=' bg-[#FFFAF0] rounded-xl p-6 shadow'
              style={{ width: `${width}rem` }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            >
              <div className='flex justify-center'>
                <h1 className='text-2xl font-bold pb-4'>{title}</h1>
              </div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </>
    ) : null,
    document.getElementById("modal")
  );
}
