import Card from 'components/common/Card';
import RadioButton from 'components/common/RadioButton';
import { ChangeEvent, useEffect, useRef } from 'react';
import { Semester, SettingsContext } from 'state/settings';
import styled from 'styled-components';
import { useContext } from 'utils/context';

const ButtonCover = styled.div<{ enabled: boolean }>((props) => ({
    display: props.enabled ? 'block' : 'none',
    cursor: 'pointer',
    width: '42px',
    height: '42px',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2
}));

const Popup = styled(Card)<{ open: boolean }>`
    ${(props) => ({
        position: 'absolute',
        right: 0,
        top: 45,
        backgroundColor: props.theme.palette.popup.main,
        display: props.open ? 'flex' : 'none',
        flexDirection: 'column',
        zIndex: 2,
        gap: 16
    })}
`;

function Settings() {
    const popupRef = useRef<HTMLDivElement>(null);

    const {
        settingsOpen,
        setSettingsOpen,
        semesterDisplay,
        setSemesterDisplay,
        enabledSemesterDisplays
    } = useContext(SettingsContext);

    const onRadioButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSemesterDisplay(parseInt(e.target.value) as Semester);
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setSettingsOpen(false);
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.code === 'Escape') {
                setSettingsOpen(false);
            }
        }

        document.body.addEventListener('mousedown', handleClickOutside);
        document.body.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.removeEventListener('mousedown', handleClickOutside);
            document.body.removeEventListener('keydown', handleKeyDown);
        };
    }, [popupRef, settingsOpen, setSettingsOpen]);

    return (
        <>
            <ButtonCover enabled={settingsOpen} />
            <Popup open={settingsOpen} ref={popupRef}>
                <RadioButton
                    disabled={!enabledSemesterDisplays.includes(Semester.All)}
                    group="semester"
                    label="Høst og vår"
                    value={Semester.All.toString()}
                    checked={semesterDisplay == Semester.All}
                    onChange={onRadioButtonChange}
                />
                <RadioButton
                    disabled={!enabledSemesterDisplays.includes(Semester.Autumn)}
                    group="semester"
                    label="Kun høst"
                    value={Semester.Autumn.toString()}
                    checked={semesterDisplay == Semester.Autumn}
                    onChange={onRadioButtonChange}
                />
                <RadioButton
                    disabled={!enabledSemesterDisplays.includes(Semester.Spring)}
                    group="semester"
                    label="Kun vår"
                    value={Semester.Spring.toString()}
                    checked={semesterDisplay == Semester.Spring}
                    onChange={onRadioButtonChange}
                />
            </Popup>
        </>
    );
}

export default Settings;
