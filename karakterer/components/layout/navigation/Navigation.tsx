import { InfoIcon, SearchIcon, SettingsIcon } from 'components/common/icons';
import { SettingsContext } from 'state/settings';
import styled from 'styled-components';
import { useContext } from 'utils/context';
import NavigationItem from './NavigationItem';

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

    return (
        <NavigationBar>
            <NavigationItem
                title="Søk"
                onClick={() => alert('search')}
                icon={<SearchIcon width={24} height={24} />}
            />
            <NavigationItem
                title="Informasjon"
                onClick={() => alert('info')}
                icon={<InfoIcon width={24} height={24} />}
            />
            <NavigationItem
                title="Innstillinger"
                active={settingsOpen}
                onClick={() => setSettingsOpen(true)}
                icon={<SettingsIcon width={24} height={24} />}
            />
        </NavigationBar>
    );
};

export default Navigation;
