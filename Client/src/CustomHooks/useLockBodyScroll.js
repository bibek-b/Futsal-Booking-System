import { useContext, useEffect } from "react"
import { ScrollLockContext } from "../Context/ScrollLockContext"

export const useLockBodyScroll = (isLocked) => {
    const { lock, unlock} = useContext(ScrollLockContext);

    useEffect(() => {
       if(!isLocked) return;

       lock();

    return () => {
        unlock();
    }
    },[isLocked])
}