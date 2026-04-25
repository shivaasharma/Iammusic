function Sidebar({ setActivePage }) {
  return (
    <div className="w-64 bg-[#000000] border-r border-[#1f1f1f] p-6 flex flex-col justify-between">
      
      <div>
        <h1 className="text-2xl font-bold mb-10 tracking-wide">
          <span className="text-[#FF3964]">M</span>
          <span className="text-white">oiré</span>
        </h1>

        <ul className="space-y-5 text-gray-400">
          
          <li
            onClick={() => setActivePage("home")}
            className="hover:text-white transition-all duration-200 cursor-pointer text-sm font-medium hover:translate-x-1"
          >
            Home
          </li>

          <li
            onClick={() => setActivePage("library")}
            className="hover:text-white transition-all duration-200 cursor-pointer text-sm font-medium hover:translate-x-1"
          >
            Library
          </li>

        </ul>
      </div>

      <div className="text-xs text-gray-500">
        Built by Arnav
      </div>
    </div>
  );
}

export default Sidebar;