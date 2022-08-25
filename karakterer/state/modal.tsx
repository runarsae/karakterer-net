import { ReactElement, useState } from 'react';
import { createContext } from 'utils/context';

export enum ModalType {
    Search
}

export const ModalContext = createContext<{
    modalOpen: boolean;
    setModalOpen: (open: boolean) => void;
    modalType: ModalType | undefined;
    setModalType: (type: ModalType) => void;
}>();

export const ModalContextProvider = ({ children }: { children: ReactElement }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<ModalType>();

    return (
        <ModalContext.Provider
            value={{
                modalOpen,
                setModalOpen,
                modalType,
                setModalType
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};
