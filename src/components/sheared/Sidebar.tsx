const Sidebar = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <aside
      className={`shrink-0 transition-all duration-300 ${
        isSmall ? "w-14" : "w-64"
      }`}
    >
      <div className="bg-white  h-screen w-full border-r border-r-gray-100">
        Sidebar
      </div>
    </aside>
  );
};

export default Sidebar;
