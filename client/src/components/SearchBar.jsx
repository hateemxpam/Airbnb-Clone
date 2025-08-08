import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="w-full flex justify-center mt-6 mb-8">
      <div className="flex hover:bg-gray-100 transition-colors duration-300 w-full max-w-5xl justify-between items-center bg-white rounded-full shadow-md px-4 py-2 space-x-4">
        {/* Where */}
        <div className="flex flex-col flex-1 px-2 hover:bg-gray-200 transition-colors duration-300">
          <label className="text-[10px] uppercase text-gray-500 font-semibold">
            Where
          </label>
          <input
            type="text"
            placeholder="Search destinations"
            className="text-sm outline-none"
          />
        </div>

        {/* Check in */}
        <div className="flex hover:bg-gray-200 transition-colors duration-300 flex-col flex-1 px-2 border-l border-gray-200">
          <label className="text-[10px] uppercase text-gray-500 font-semibold">
            Check in
          </label>
          <input type="date" className="text-sm outline-none" />
        </div>

        {/* Check out */}
        <div className="flex flex-col flex-1 px-2 hover:bg-gray-200 transition-colors duration-300 border-l border-gray-200">
          <label className="text-[10px] uppercase text-gray-500 font-semibold">
            Check out
          </label>
          <input type="date" className="text-sm outline-none" />
        </div>

        {/* Who */}
        <div className="flex flex-col flex-1 px-2 hover:bg-gray-200 transition-colors duration-300 border-l border-gray-200">
          <label className="text-[10px] uppercase text-gray-500 font-semibold">
            Who
          </label>
          <input
            type="number"
            placeholder="Add guests"
            className="text-sm outline-none"
            min={1}
            max={10}
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full cursor-pointer transition">
          <FaSearch size={17} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
