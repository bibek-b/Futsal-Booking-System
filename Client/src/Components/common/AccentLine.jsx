const AccentLine = ({verticalPosition}) => {
return <div className={`absolute ${verticalPosition} left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff87] to-transparent opacity-60`} />
}
export default AccentLine;