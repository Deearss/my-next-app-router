import React from "react";

const DashboardLayout = ({
  children,
  analytics,
  payments,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  payments: React.ReactNode;
}) => {
  return (
    <>
      <div className="p-5 w-full">
        <div>{children}</div>
        <div className="mt-5 flexc gap-5">
          {analytics}
          {payments}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
