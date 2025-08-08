const AirbnbLogo = ({ width = "w-24", className = "" }) => {
  return (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
      alt="Airbnb"
      className={`${width} ${className}`}
    />
  );
};

export default AirbnbLogo;
