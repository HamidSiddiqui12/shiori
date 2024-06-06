"use client";

import React from "react";
import { Toaster } from "./ui/sonner";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToastProvider;
