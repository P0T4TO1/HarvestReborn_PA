import { FC, ReactNode } from "react";

interface Props {
  handleClose: () => void;
  show: boolean;
  children: ReactNode;
  title: string;
}

export const Modal: FC<Props> = ({ handleClose, show, children, title }) => {
  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center`}
    >
      <section className="relative p-4 w-full max-w-md max-h-full">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t-lg relative bg-white shadow">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="default-modal"
            onClick={handleClose}
          >
            <span className="material-symbols-outlined">close</span>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};
