import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import AirbnbLogo from "./AirbnbLogo";

const AuthPanel = ({ isSignUp, setIsSignUp }) => {
  return (
    <div className="relative w-[900px] min-h-[600px] bg-white rounded-xl shadow-2xl overflow-hidden flex transition-all duration-700">
      {/* Slide panel container */}
      <div
        className={`absolute inset-0 flex w-[1800px] transition-transform duration-700 ${
          isSignUp ? "-translate-x-[900px]" : "translate-x-0"
        }`}
      >
        {/* Sign In Panel (Left) */}
        <div className="w-[900px] h-full p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-coral mb-6">Welcome Back </h2>
          <AirbnbLogo className="w-30 ml-165 relative -top-15 h-8 mt-1" />
          <SignInForm />
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <button
              className="text-coral font-semibold hover:underline"
              onClick={() => setIsSignUp(true)}
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Sign Up Panel (Right) */}
        <div className="w-[900px] h-full p-10 flex flex-col justify-center bg-gray-50">
          <h2 className="text-3xl font-bold text-coral mb-6">
            Create an Account
          </h2>
          <AirbnbLogo className="w-30 ml-165 relative -top-15 h-8 mt-1" />
          <SignUpForm />
          <p className="mt-4 text-sm">
            Already have an account?{" "}
            <button
              className="text-coral font-semibold hover:underline"
              onClick={() => setIsSignUp(false)}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
