import React from "react";
import toast from "react-hot-toast";

interface ILoginFirst {
  children: any;
}

const LoginFirst = ({ children }: ILoginFirst) => {
  React.useEffect(() => {
    toast.error("Unauthorized access, Please Login First!");
  });
  return <>{children}</>;
};

export default LoginFirst;
