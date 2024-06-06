import Header from "@/components/customs/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex flex-1 w-full">{children}</div>
    </main>
  );
};

export default layout;
