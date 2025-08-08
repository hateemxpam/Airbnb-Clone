// src/components/HostProfilePanel.jsx

const HostProfilePanel = ({ profile }) => {
  if (!profile) return null;

  const {
    name,
    email,
    phone = "Not provided",
    about = "No description",
    rating = "Not rated",
    image = "https://i.pravatar.cc/150?img=3",
  } = profile;

  return (
    <div className="text-center">
      <img
        src={image}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-600">{phone}</p>
      <p className="mt-2 text-sm text-gray-700 italic">{about}</p>
      <p className="mt-2 text-sm font-medium text-yellow-500">
        ⭐ {rating} rating
      </p>
    </div>
  );
};

export default HostProfilePanel;
