import IconButton from 'components/common/IconButton';
import { InfoIcon, SearchIcon, SettingsIcon } from 'components/common/icons';
import { SettingsContext } from 'state/settings';
import { SidebarContext, SidebarType } from 'state/sidebar';
import { ModalContext, ModalType } from 'state/modal';
import styled from 'styled-components';
import { useContext } from 'utils/context';

const NavigationBar = styled.div((props) => ({
    gridArea: 'navigation',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center',
    justifySelf: 'right',
    gap: '8px',
    borderRadius: `${props.theme.borderRadius}px`
}));

const Navigation = () => {
    const { settingsOpen, setSettingsOpen } = useContext(SettingsContext);

    const { sidebarOpen, setSidebarOpen, sidebarType, setSidebarType } = useContext(SidebarContext);

    const { modalOpen, setModalOpen, modalType, setModalType } = useContext(ModalContext);

    return (
        <NavigationBar>
            <IconButton
                title="Søk"
                active={modalOpen && modalType == ModalType.Search}
                onClick={() => {
                    setModalType(ModalType.Search);
                    setModalOpen(true);
                }}
                icon={<SearchIcon width={24} height={24} />}
            />
            <IconButton
                title="Informasjon"
                active={sidebarOpen && sidebarType == SidebarType.About}
                onClick={() => {
                    setSidebarType(SidebarType.About);
                    setSidebarOpen(true);
                }}
                icon={<InfoIcon width={24} height={24} />}
            />
            <IconButton
                title="Innstillinger"
                active={settingsOpen}
                onClick={() => setSettingsOpen(true)}
                icon={<SettingsIcon width={24} height={24} />}
            />
        </NavigationBar>
    );
};

export default Navigation;
