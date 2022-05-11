import { ReactElement, useState } from 'react';
import { createContext } from 'utils/context';

export enum Semester {
    All = 0,
    Spring = 1,
    Autumn = 3
}

export const SettingsContext = createContext<{
    settingsOpen: boolean;
    setSettingsOpen: (open: boolean) => void;
    semesterDisplay: Semester;
    setSemesterDisplay: (semesterDisplay: Semester) => void;
    enabledSemesterDisplays: Semester[];
    setEnabledSemesterDisplays: (semesterDisplays: Semester[]) => void;
}>();

export const SettingsContextProvider = ({ children }: { children: ReactElement }) => {
    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [semesterDisplay, setSemesterDisplay] = useState<Semester>(Semester.All);
    const [enabledSemesterDisplays, setEnabledSemesterDisplays] = useState<Semester[]>([]);

    return (
        <SettingsContext.Provider
            value={{
                settingsOpen,
                setSettingsOpen,
                semesterDisplay,
                setSemesterDisplay,
                enabledSemesterDisplays,
                setEnabledSemesterDisplays
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
