import { createContext, useState } from "react";

export const ConfirmModalContext = createContext();

export const ConfirmModalContextProvider = ({children}) => {
    const [isShowModal, setIsShowModal] = useState(false);

    const showConfirmModal = () => {
        setIsShowModal(true);
    }
      const hideConfirmModal = () => {
        setIsShowModal(false);
    }

    return <ConfirmModalContext.Provider value={{isShowModal, showConfirmModal, hideConfirmModal}}>
        {children}
    </ConfirmModalContext.Provider>
}