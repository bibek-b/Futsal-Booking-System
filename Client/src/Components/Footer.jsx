const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-white/5 py-6 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-2">
      <span className="text-xs text-white/20 tracking-widest uppercase">
        Bibek Futsal · ArenaX
      </span>
      <span className="text-xs text-white/20">
        © {new Date().getFullYear()} All rights reserved
      </span>
    </footer>
  );
};

export default Footer;
