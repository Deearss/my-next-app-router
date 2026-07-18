import React from "react";

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-teal-500">About Layout</div>
      <div>{children}</div>
    </>
  );
};

export default AboutLayout;
