/* eslint-disable react/prop-types */

const ModalContainer = ({ children, height, width, className }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-50 bg-black z-50">
      <div
        className={`${width ? width : "w-1/2"} ${
          height ? height : "h-screen"
        }  bg-white rounded-lg flex flex-col items-center justify-between ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
