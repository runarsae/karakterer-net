import IconButton from 'components/common/IconButton';
import { InfoIcon, SearchIcon, SettingsIcon } from 'components/common/icons';
import Settings from 'components/course/Settings';
import { useRouter } from 'next/router';
import { SearchContext } from 'state/search';
import { SettingsContext } from 'state/settings';
import styled from 'styled-components';
import { useContext } from 'utils/context';

const Navigation = styled.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    alignItems: 'center',
    gap: '8px'
});

const NavigationItemSearch = () => {
    const { setSearchOpen } = useContext(SearchContext);

    return (
        <IconButton
            title="Søk"
            onClick={() => {
                setSearchOpen(true);
            }}
            icon={<SearchIcon width={24} height={24} />}
        />
    );
};

const NavigationItemInformation = () => {
    const router = useRouter();

    return (
        <IconButton
            title="Informasjon"
            onClick={() => router.push('/about')}
            icon={<InfoIcon width={24} height={24} />}
        />
    );
};

const NavigationItemSettings = () => {
    const { settingsOpen, setSettingsOpen } = useContext(SettingsContext);

    return (
        <>
            <IconButton
                title="Innstillinger"
                active={settingsOpen}
                onClick={() => setSettingsOpen(true)}
                icon={<SettingsIcon width={24} height={24} />}
            />
            <Settings />
        </>
    );
};

export { Navigation, NavigationItemSearch, NavigationItemInformation, NavigationItemSettings };
