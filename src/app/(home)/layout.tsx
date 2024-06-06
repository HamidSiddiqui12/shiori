import { Header } from "@/components/customs/header";
import { cookies } from "next/headers";
import React from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const id = cookies().get("token")?.value || null;

  return (
    <main>
      <Header id={id} />
      {children}
    </main>
  );
}
