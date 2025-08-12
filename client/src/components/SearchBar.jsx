import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="w-full flex justify-center mb-12">
      <div className="flex hover:bg-white hover:shadow-lg transition-all duration-300 w-full max-w-4xl justify-between items-center bg-white rounded-2xl shadow-lg px-6 py-4 space-x-6 border border-gray-100">
        {/* Where */}
        <div className="flex flex-col flex-1 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer">
          <label className="text-xs uppercase text-gray-500 font-semibold tracking-wide mb-1">
            Where
          </label>
          <input
            type="text"
            placeholder="Search destinations"
            className="text-base outline-none bg-transparent placeholder-gray-400"
          />
        </div>

        {/* Check in */}
        <div className="flex hover:bg-gray-50 transition-colors duration-200 flex-col flex-1 px-3 py-2 border-l border-gray-200 rounded-lg cursor-pointer">
          <label className="text-xs uppercase text-gray-500 font-semibold tracking-wide mb-1">
            Check in
          </label>
          <input type="date" className="text-base outline-none bg-transparent" />
        </div>

        {/* Check out */}
        <div className="flex flex-col flex-1 px-3 py-2 hover:bg-gray-50 transition-colors duration-200 border-l border-gray-200 rounded-lg cursor-pointer">
          <label className="text-xs uppercase text-gray-500 font-semibold tracking-wide mb-1">
            Check out
          </label>
          <input type="date" className="text-base outline-none bg-transparent" />
        </div>

        {/* Who */}
        <div className="flex flex-col flex-1 px-3 py-2 hover:bg-gray-50 transition-colors duration-200 border-l border-gray-200 rounded-lg cursor-pointer">
          <label className="text-xs uppercase text-gray-500 font-semibold tracking-wide mb-1">
            Who
          </label>
          <input
            type="number"
            placeholder="Add guests"
            className="text-base outline-none bg-transparent placeholder-gray-400"
            min={1}
            max={10}
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-xl cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
          <FaSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
