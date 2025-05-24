const Footer = () => {
  const date = new Date();
  return (
    <div className="flex items-center justify-center p-5 text-[18px] bg-[#242424]">
      Copyright &copy; Gajuri Futsal ArenaX, {date.getFullYear()}
    </div>
  );
};

export default Footer;
