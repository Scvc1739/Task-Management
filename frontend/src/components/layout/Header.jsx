function Header() {
  return (
    <header className="h-16 bg-white border-b border-[#f0f3f4] flex items-center justify-between px-6">
      <h1 className="text-lg font-bold tracking-tight">
        Task Management System
      </h1>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-blue-600 transition">
          🔍
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
          JD
        </div>
      </div>
    </header>
  );
}

export default Header;

