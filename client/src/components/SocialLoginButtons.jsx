const SocialLoginButtons = () => {
  return (
    <div className="flex justify-center space-x-4">
      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <img
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
          className="h-6 w-6"
        />
      </button>
      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <img
          src="https://img.icons8.com/color/48/facebook-new.png"
          alt="facebook-new"
          className="h-6 w-6"
        />
      </button>
      <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios-filled/50/mac-os.png"
          alt="mac-os"
          className="h-6 w-6"
        />
      </button>
    </div>
  );
};

export default SocialLoginButtons;
