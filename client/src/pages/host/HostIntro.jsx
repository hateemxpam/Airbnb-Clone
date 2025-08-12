import { useNavigate } from "react-router-dom";
import AirbnbLogo from "../../components/AirbnbLogo";
import { FaHome, FaCamera, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    title: "Tell us about your place",
    desc: "Share some basic info, like where it is and how many guests can stay.",
    icon: <FaHome className="text-rose-500" size={24} />,
  },
  {
    title: "Make it stand out",
    desc: "Add 5 or more photos plus a title and description—we'll help you out.",
    icon: <FaCamera className="text-rose-500" size={24} />,
  },
  {
    title: "Finish up and publish",
    desc: "Choose a starting price, verify a few details, then publish your listing.",
    icon: <FaCheckCircle className="text-rose-500" size={24} />,
  },
];

const HostIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-gradient-to-br from-white to-rose-50">
      {/* Left Panel */}
      <div className="md:w-1/2 p-10 flex flex-col justify-center md:justify-between md:h-screen">
        <div>
          <AirbnbLogo className="h-8 mb-10" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            It's easy to get <br /> started on Airbnb
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Join thousands of hosts sharing their spaces and earning extra income.
          </p>
        </div>
      </div>

      {/* Exit Button */}
      <button
        onClick={() => navigate("/host/dashboard")}
        className="absolute top-6 right-6 border border-gray-300 px-4 py-1.5 text-sm rounded-full hover:bg-gray-100 transition shadow-sm"
      >
        Exit
      </button>

      {/* Right Panel */}
      <div className="md:w-1/2 px-8 py-10 flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">How it works</h2>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-5 pb-6 border-b last:border-0 last:pb-0"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Get Started Button (Inside Card) */}
          <button
            onClick={() => navigate("/host/home/property-type")}
            className="mt-8 w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white px-6 py-3 rounded-lg font-medium transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostIntro;
