import React from "react";

const profileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-yellow-600">Profile Layout</div>
      <div>{children}</div>
    </>
  );
};

export default profileLayout;
