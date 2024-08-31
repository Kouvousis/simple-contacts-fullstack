import React from "react";
import { X } from "lucide-react";

function Modal({ isOpen, children, closeModal }) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed  inset-0 flex flex-col justify-center items-center transition-colors ${
        isOpen ? "visible bg-black/40" : "invisible"
      }`}
    >
      <div className="flex flex-col items-center w-full max-w-lg bg-slate-700 rounded-t">
        <div className="flex self-end pt-4 pr-4">
          <button
            onClick={closeModal}
            type="button"
            className="self-end text-white hover:text-gray-600"
          >
            <X />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Modal;
