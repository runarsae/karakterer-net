import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Transition } from 'react-transition-group';
import Overlay from './Overlay';
import { disableScroll, enableScroll } from '../../utils/scroll';
import IconButton from './IconButton';
import { CloseIcon } from './icons';
import Typography from './Typography';

const Wrapper = styled.div((props) => ({
    position: 'fixed',
    top: 0,
    right: '-100%',
    backgroundColor: props.theme.palette.card.main,
    height: '100%',
    width: '100%',
    transition: 'right ' + props.theme.transitionDuration + 'ms ease',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 2,
    padding: '0 16px 16px 16px'
}));

const Header = styled.div<{ sticky: boolean }>((props) => ({
    display: 'flex',
    ...(props.sticky && {
        position: 'sticky',
        top: 0,
        zIndex: 1
    }),
    backgroundColor: props.theme.palette.card.main,
    padding: '16px 0 16px 0'
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

interface Props {
    children: JSX.Element;
    open: boolean;
    onClose: () => void;
    stickyHeader?: boolean;
    title: string;
}

export default function Sidebar({ children, open, onClose, stickyHeader, title }: Props) {
    const theme = useTheme();

    const sidebarRef = useRef(null);

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                onClose();
            }
        };

        if (open) {
            document.addEventListener('keydown', closeOnEsc, false);

            return () => {
                document.removeEventListener('keydown', closeOnEsc, false);
            };
        }
    }, [onClose, open]);

    useEffect(() => {
        if (open) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [open]);

    return (
        <>
            <Overlay open={open} onClose={onClose} />
            <Transition
                nodeRef={sidebarRef}
                mountOnEnter
                unmountOnExit
                in={open}
                timeout={theme.transitionDuration}
            >
                {(state) => (
                    <div ref={sidebarRef}>
                        <Wrapper
                            style={{
                                ...sidebarTransitionStyles[state]
                            }}
                        >
                            <Header sticky={Boolean(stickyHeader)}>
                                <Title variant="h1">{title}</Title>
                                <CloseButton
                                    title="Lukk"
                                    onClick={onClose}
                                    icon={<CloseIcon width={24} height={24} />}
                                />
                            </Header>

                            {children}
                        </Wrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}
