import { InfoIcon, SearchIcon, SettingsIcon } from 'components/common/icons';
import styled, { useTheme } from 'styled-components';
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
    const theme = useTheme();

    return (
        <NavigationBar>
            {/* <NavigationItem title="Hjem" path="/" icon={<HomeIcon width={24} height={24} />} /> */}
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
                onClick={() => alert('settings')}
                icon={<SettingsIcon width={24} height={24} />}
            />
        </NavigationBar>
    );
};

export default Navigation;
