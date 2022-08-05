import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { createContext } from 'utils/context';
import { Grades } from './dashboard';

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

interface Props {
    children: ReactNode;
    grades: Grades[];
}

export const SettingsContextProvider = ({ children, grades }: Props) => {
    // Check which semesters the course has grades for
    const hasSpring = useMemo(() => grades.some((item) => item.semester === 1), [grades]);
    const hasAutumn = useMemo(() => grades.some((item) => item.semester === 3), [grades]);

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    // TODO: Set default to main semester
    const [semesterDisplay, setSemesterDisplay] = useState<Semester>(
        hasSpring && hasAutumn ? Semester.All : hasSpring ? Semester.Spring : Semester.Autumn
    );

    const [enabledSemesterDisplays, setEnabledSemesterDisplays] = useState<Semester[]>([
        ...(hasSpring ? [Semester.Spring] : []),
        ...(hasAutumn ? [Semester.Autumn] : []),
        ...(hasSpring && hasAutumn ? [Semester.All] : [])
    ]);

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
