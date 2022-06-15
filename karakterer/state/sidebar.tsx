import { ReactElement, useState } from 'react';
import { createContext } from 'utils/context';

export enum SidebarType {
    Search,
    About
}

export const SidebarContext = createContext<{
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    sidebarType: SidebarType | undefined;
    setSidebarType: (type: SidebarType) => void;
}>();

export const SidebarContextProvider = ({ children }: { children: ReactElement }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [sidebarType, setSidebarType] = useState<SidebarType>();

    return (
        <SidebarContext.Provider
            value={{
                sidebarOpen,
                setSidebarOpen,
                sidebarType,
                setSidebarType
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
