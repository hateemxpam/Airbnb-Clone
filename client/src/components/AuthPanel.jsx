import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import AirbnbLogo from "./AirbnbLogo";

const AuthPanel = ({ isSignUp, setIsSignUp }) => {
  const cardWidth = 640; // smaller overall card width for a more compact look
  return (
    <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white" style={{ width: `${cardWidth}px` }}>
      {/* Sliding rail (keeps only one card visible) */}
      <div
        className={`flex transition-transform duration-700 ease-out`}
        style={{ width: `${cardWidth * 2}px`, transform: isSignUp ? `translateX(-${cardWidth}px)` : 'translateX(0px)' }}
      >
        {/* Sign In Card */}
        <div className="p-6 flex items-center justify-center" style={{ width: `${cardWidth}px` }}>
          <div className="max-w-[420px] w-full mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">Welcome Back</h2>
            <AirbnbLogo className="h-8 mb-4 mx-auto" />
            <SignInForm />
            <p className="mt-4 text-sm">
              Don't have an account?{' '}
              <button
                className="text-rose-500 font-semibold hover:underline"
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Sign Up Card */}
        <div className="p-6 bg-gray-50" style={{ width: `${cardWidth}px` }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Airbnb</h2>
          <p className="text-gray-600 mb-5">Create an account to start your journey</p>
          <AirbnbLogo className="h-8 mb-4" />
          <SignUpForm />
          <p className="mt-4 text-sm">
            Already have an account?{' '}
            <button
              className="text-rose-500 font-semibold hover:underline"
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
