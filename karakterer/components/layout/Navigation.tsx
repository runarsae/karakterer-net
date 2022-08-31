import IconButton from 'components/common/IconButton';
import { InfoIcon, SearchIcon, SettingsIcon } from 'components/common/icons';
import { useRouter } from 'next/router';
import { SearchContext } from 'state/search';
import { SettingsContext } from 'state/settings';
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
    const router = useRouter();

    const { setSearchOpen } = useContext(SearchContext);
    const { settingsOpen, setSettingsOpen } = useContext(SettingsContext);

    return (
        <NavigationBar>
            <IconButton
                title="Søk"
                onClick={() => {
                    setSearchOpen(true);
                }}
                icon={<SearchIcon width={24} height={24} />}
            />
            <IconButton
                title="Informasjon"
                onClick={() => router.push('/about')}
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
