import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border border-gray-300 p-8 rounded-md w-1/2 m-auto">
      {children}
    </div>
  );
};

export default Layout;
