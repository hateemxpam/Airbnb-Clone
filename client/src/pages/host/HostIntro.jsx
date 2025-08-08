import { useNavigate } from "react-router-dom";
import AirbnbLogo from "../../components/AirbnbLogo"; // Reusable logo component

const steps = [
  {
    title: "Tell us about your place",
    desc: "Share some basic info, like where it is and how many guests can stay.",
    img: "/assets/bed.png",
  },
  {
    title: "Make it stand out",
    desc: "Add 5 or more photos plus a title and description—we’ll help you out.",
    img: "/assets/sofa.png",
  },
  {
    title: "Finish up and publish",
    desc: "Choose a starting price, verify a few details, then publish your listing.",
    img: "/assets/door.png",
  },
];

const HostIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative bg-white">
      {/* Left Panel */}
      <div className="md:w-1/2 p-10 flex flex-col justify-between">
        <AirbnbLogo className="h-8 mb-10" />
        <h1 className="text-4xl md:text-5xl font-semibold">
          It’s easy to get <br /> started on Airbnb
        </h1>
      </div>

      {/* Exit Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-6 right-6 border border-gray-300 px-4 py-1.5 text-sm rounded-full hover:bg-gray-100 transition"
      >
        Exit
      </button>

      {/* Right Panel */}
      <div className="md:w-1/2 px-6 py-8 space-y-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b pb-6 last:border-0"
          >
            <div className="flex gap-4">
              <p className="text-lg font-semibold">{i + 1}</p>
              <div>
                <h3 className="font-medium text-base">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
            <img
              src={step.img}
              alt={step.title}
              className="h-14 w-14 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Fixed Bottom Button */}
      <div className="absolute bottom-0 right-0 left-0 border-t p-4 bg-white flex justify-end">
        <button
          onClick={() => navigate("/host/home/property-type")}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-medium transition"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default HostIntro;
