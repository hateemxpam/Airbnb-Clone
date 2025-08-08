import { useState } from "react";
import AuthPanel from "../components/AuthPanel";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthPanel isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </div>
  );
};

export default AuthPage;
