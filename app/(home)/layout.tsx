import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemAbout,
    NavigationItemSearch
} from 'components/layout/Navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header>
                <Navigation>
                    <NavigationItemSearch />
                    <NavigationItemAbout />
                </Navigation>
            </Header>
            {children}
        </>
    );
}
