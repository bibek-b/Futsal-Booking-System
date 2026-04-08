import { createContext, useRef } from "react";

export const ScrollLockContext = createContext();

export const ScrollLockContextProvider = ({children}) => {
    const lockCount = useRef(0);

    const lock = () => {
        lockCount.current +=1;
        document.body.style.overflow = 'hidden';
    };
    const unlock = () => {
        lockCount.current -= 1;
        if(lockCount.current <= 0) {
            lockCount.current = 0;
            document.body.style.overflow = "auto";
        }
    };


    return  <ScrollLockContext.Provider value={{lock, unlock}}>
        {children}
    </ScrollLockContext.Provider>
}