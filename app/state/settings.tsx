import { ReactNode, useEffect, useMemo, useState } from 'react';
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
    semesterDisplay: Semester | undefined;
    setSemesterDisplay: (semesterDisplay: Semester) => void;
    enabledSemesterDisplays: Semester[];
}>();

interface Props {
    children: ReactNode;
    grades: Grades[];
}

export const SettingsContextProvider = ({ children, grades }: Props) => {
    // Check which semesters the course has grades for
    const hasSpring = useMemo(() => grades.some((item) => item.semester === 1), [grades]);
    const hasAutumn = useMemo(() => grades.some((item) => item.semester === 3), [grades]);

    const enabledSemesterDisplays = useMemo(
        () => [
            ...(hasSpring ? [Semester.Spring] : []),
            ...(hasAutumn ? [Semester.Autumn] : []),
            ...(hasSpring && hasAutumn ? [Semester.All] : [])
        ],
        [hasAutumn, hasSpring]
    );

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const [semesterDisplay, setSemesterDisplay] = useState<Semester>();

    useEffect(() => {
        // TODO: Set default to main semester
        setSemesterDisplay(
            hasSpring && hasAutumn ? Semester.All : hasSpring ? Semester.Spring : Semester.Autumn
        );
    }, [hasAutumn, hasSpring]);

    return (
        <SettingsContext.Provider
            value={{
                settingsOpen,
                setSettingsOpen,
                semesterDisplay,
                setSemesterDisplay,
                enabledSemesterDisplays
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};
