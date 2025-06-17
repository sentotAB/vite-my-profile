const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-black via-gray-800 to-gray-950">
      <footer className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 py-4 border-t border-gray-100">
        <p className="text-gray-500 text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-0">
        Sentot Ali Basah&apos;s Web Client Development &copy; {new Date().getFullYear()}
        </p>
        <div className="h-[2px] w-12 md:w-24 bg-gray-200"></div>
      </footer>
    </div>
  );
};
export default Footer;