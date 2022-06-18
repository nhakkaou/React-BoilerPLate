import React, { FC } from "react";

const Login: FC = () => {
  return (
    <div className="Login">
      <div>
        <span>Student Name:</span>
        <input type="text" placeholder="Username" />
      </div>
    </div>
  );
};

export default Login;
