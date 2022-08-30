import Modal from 'components/common/Modal';
import Sidebar from 'components/common/Sidebar';
import useCourseSearch from 'hooks/useCourseSearch';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SearchContext } from 'state/search';
import { useTheme } from 'styled-components';
import { useContext } from 'utils/context';
import useWindowSize from 'utils/windowSize';
import ModalSearch from './ModalSearch';
import SidebarSearch from './SidebarSearch';

function Search() {
    const router = useRouter();
    const theme = useTheme();
    const { width } = useWindowSize();

    const { searchOpen, setSearchOpen } = useContext(SearchContext);

    const courseSearch = useCourseSearch();

    const handleClose = () => {
        setSearchOpen(false);
        setTimeout(() => {
            courseSearch.setSearch('');
        }, theme.transitionDuration);
    };

    // Close when route is changing
    useEffect(() => {
        const handleRouteChange = (url: string) => url !== router.asPath && handleClose();

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    });

    if (width && width >= theme.breakpoints.md) {
        return (
            <Modal open={searchOpen} onClose={handleClose}>
                <ModalSearch {...courseSearch} />
            </Modal>
        );
    }

    return (
        <Sidebar open={searchOpen} onClose={handleClose} title="Søk" stickyHeader>
            <SidebarSearch {...courseSearch} />
        </Sidebar>
    );
}

export default Search;
