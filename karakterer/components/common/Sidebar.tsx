import React, { CSSProperties, useCallback, useEffect, useMemo, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Transition } from 'react-transition-group';
import Overlay from './Overlay';
import { disableScroll, enableScroll } from '../../utils/scroll';
import IconButton from './IconButton';
import { CloseIcon } from './icons';
import { useContext } from 'utils/context';
import { SidebarContext, SidebarType } from 'state/sidebar';
import Search from 'components/search/Search';
import About from 'components/about/About';
import Typography from './Typography';

const Wrapper = styled.div((props) => ({
    position: 'fixed',
    top: 0,
    right: '-480px',
    backgroundColor: props.theme.palette.background,
    height: '100%',
    width: '100%',
    maxWidth: '480px !important',
    transition: 'right ' + props.theme.transitionDuration + 'ms ease',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 2,
    padding: '0 16px 16px 16px',

    [`@media (min-width: 480px)`]: {
        padding: '0 32px 32px 32px'
    }
}));

const Header = styled.div<{ sticky: boolean }>((props) => ({
    display: 'flex',
    ...(props.sticky && {
        position: 'sticky',
        top: 0,
        zIndex: 1
    }),
    backgroundColor: props.theme.palette.background,
    padding: '16px 0 16px 0',

    [`@media (min-width: 480px)`]: {
        padding: '32px 0 16px 0'
    }
}));

const Title = styled(Typography)({
    flex: 1,
    lineHeight: '42px'
});

const CloseButton = styled(IconButton)({
    marginRight: -8
});

const sidebarTransitionStyles: { [id: string]: CSSProperties } = {
    entered: { right: 0 }
};

type SidebarContentMap = {
    [key in SidebarType]: {
        component: JSX.Element;
        title: string;
        stickyHeader: boolean;
    };
};

const sidebarContentMap: SidebarContentMap = {
    [SidebarType.Search]: {
        component: <Search />,
        title: 'Søk',
        stickyHeader: true
    },
    [SidebarType.About]: {
        component: <About />,
        title: 'Om KARAKTERER.net',
        stickyHeader: false
    }
};

export default function Sidebar() {
    const theme = useTheme();

    const { sidebarOpen, setSidebarOpen, sidebarType } = useContext(SidebarContext);

    const sidebarRef = useRef(null);

    const close = useCallback(() => {
        setSidebarOpen(false);
    }, [setSidebarOpen]);

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                close();
            }
        };

        if (sidebarOpen) {
            document.addEventListener('keydown', closeOnEsc, false);

            return () => {
                document.removeEventListener('keydown', closeOnEsc, false);
            };
        }
    }, [close, sidebarOpen]);

    useEffect(() => {
        if (sidebarOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [sidebarOpen]);

    const sidebarContent = useMemo(
        () => sidebarType !== undefined && sidebarContentMap[sidebarType],
        [sidebarType]
    );

    return (
        <>
            <Overlay open={sidebarOpen} onClose={close} />
            <Transition
                nodeRef={sidebarRef}
                mountOnEnter
                unmountOnExit
                in={sidebarOpen}
                timeout={theme.transitionDuration}
            >
                {(state) => (
                    <div ref={sidebarRef}>
                        <Wrapper
                            style={{
                                ...sidebarTransitionStyles[state]
                            }}
                        >
                            {sidebarContent && (
                                <>
                                    <Header sticky={sidebarContent.stickyHeader}>
                                        <Title variant="h1">{sidebarContent.title}</Title>
                                        <CloseButton
                                            title="Lukk"
                                            onClick={close}
                                            icon={<CloseIcon width={24} height={24} />}
                                        />
                                    </Header>

                                    {sidebarContent.component}
                                </>
                            )}
                        </Wrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}
