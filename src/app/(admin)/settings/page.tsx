"use client";

import { MySession } from "@/interfaces/mySession";
import { useSession } from "next-auth/react";
import React from "react";

const SettingsPage = () => {
  const { data: session } = useSession() as MySession;

  return (
    <>
      <div>SettingsPage</div>
      <h2>{session?.user?.fullname}</h2>
    </>
  );
};

export default SettingsPage;
