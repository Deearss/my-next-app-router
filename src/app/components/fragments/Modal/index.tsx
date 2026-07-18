"use client";

import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useRef } from "react";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const overlay = useRef(null);
  const router = useRouter();

  const close: MouseEventHandler = (e) => {
    if (e.target === overlay.current) router.back();
  };

  return (
    <>
      <div
        ref={overlay}
        onClick={close}
        className="fixed z-10 left-0 top-0 w-full h-full bg-black/60"
      >
        <div className="transcenter p-6 bg-white rounded-lg">{children}</div>
      </div>
    </>
  );
};

export default Modal;
