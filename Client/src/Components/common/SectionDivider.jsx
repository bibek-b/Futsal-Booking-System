const SectionDivider = () => {
    return (
  <div className="flex items-center gap-4 px-6 md:px-20 opacity-20">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00ff87] to-transparent" />
    <div className="w-1.5 h-1.5 rounded-full bg-[#00ff87] rotate-45" />
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#00ff87] to-transparent" />
  </div>
)
};
export default SectionDivider;