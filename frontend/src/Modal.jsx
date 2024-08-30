import React from "react";

function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col justify-center items-center transition-colors ${
        isOpen ? "visible bg-black/40" : "invisible"
      }`}
    >
      {children}
    </div>
  );
}

export default Modal;
