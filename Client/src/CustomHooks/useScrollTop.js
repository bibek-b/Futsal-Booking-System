import { useEffect } from "react"

export const useScrollTop = () => {
    useEffect(() => {
    // if(!isHome){
      window.scrollTo({top:0})
  },[])
}