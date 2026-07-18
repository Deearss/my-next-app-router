import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-sky-500">Home Layout</div>
      <div>{children}</div>
    </>
  );
};

export default HomeLayout;
