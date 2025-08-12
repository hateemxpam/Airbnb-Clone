// src/pages/host/HostChoice.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const choices = [
  { key: 'home', title: 'Home', desc: 'List a place to stay', emoji: '🏠' },
  { key: 'service', title: 'Service', desc: 'Offer a guest service', emoji: '🛠️' },
];

const HostChoice = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-rose-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">What would you like to host?</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {choices.map((c) => (
            <button
              key={c.key}
              onClick={() => setSelected(c.key)}
              className={`text-left border rounded-xl p-6 transition hover:shadow-md ${
                selected === c.key ? 'border-rose-500 ring-2 ring-rose-200' : 'border-gray-300'
              }`}
            >
              <div className="text-4xl mb-2">{c.emoji}</div>
              <div className="font-medium text-lg">{c.title}</div>
              <div className="text-sm text-gray-600">{c.desc}</div>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button
            disabled={!selected}
            onClick={() => navigate(`/host/${selected}`)}
            className={`px-6 py-3 rounded-full text-white font-medium transition ${
              selected ? 'bg-rose-500 hover:bg-rose-600' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostChoice;


