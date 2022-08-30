import { ReactElement, useState } from 'react';
import { createContext } from 'utils/context';

export const SearchContext = createContext<{
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
}>();

export const SearchContextProvider = ({ children }: { children: ReactElement }) => {
    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    return (
        <SearchContext.Provider
            value={{
                searchOpen,
                setSearchOpen
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};
