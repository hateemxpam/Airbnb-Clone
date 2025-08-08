import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicInfo = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
  });

  const limits = {
    guests: 15,
    bedrooms: 20,
    beds: 60,
    bathrooms: 10,
  };

  const handleChange = (field, operation) => {
    setInfo((prev) => {
      let newValue =
        operation === 'inc'
          ? prev[field] + 1
          : prev[field] - 1;

      if (newValue < 1) newValue = 1;
      if (newValue > limits[field]) newValue = limits[field];

      return { ...prev, [field]: newValue };
    });
  };

  const handleNext = () => {
    // Optionally save to global state or context
    navigate('/host/home/photos');
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <div className="w-full max-w-2xl space-y-8">
        <h2 className="text-3xl font-semibold">
          Share some basics about your place
        </h2>
        <p className="text-gray-500">
          You'll add more details later, like bed types.
        </p>

        {['guests', 'bedrooms', 'beds', 'bathrooms'].map((field) => (
          <div key={field} className="flex justify-between items-center border-b py-4">
            <div className="capitalize font-medium text-lg">{field}</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleChange(field, 'dec')}
                className="w-8 h-8 rounded-full border text-xl text-gray-700 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-6 text-center">{info[field]}</span>
              <button
                onClick={() => handleChange(field, 'inc')}
                className="w-8 h-8 rounded-full border text-xl text-gray-700 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate('/host/home/location')}
            className="px-6 py-3 rounded-full border hover:bg-gray-100"
          >
            Back
          </button>          
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
