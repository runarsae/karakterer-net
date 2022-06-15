import React, { useCallback, useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Transition } from 'react-transition-group';
import Overlay from './Overlay';
import { disableScroll, enableScroll } from '../../utils/scroll';
import IconButton from './IconButton';
import { CloseIcon } from './icons';

const Wrapper = styled.div((props) => ({
    position: 'fixed',
    top: 0,
    right: '-480px',
    backgroundColor: props.theme.palette.card,
    height: '100%',
    width: '100%',
    maxWidth: '480px !important',
    transition: 'right ' + props.theme.transitionDuration + 'ms ease',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 11,

    padding: '32px 32px',

    [`@media (min-width: ${props.theme.breakpoints.xs}px)`]: {
        padding: '32px 32px'
    }
}));

const CloseButton = styled(IconButton)`
    ${(props) => ({
        position: 'absolute',
        top: 32,
        right: 32,

        [`@media (min-width: ${props.theme.breakpoints.xs}px)`]: {
            right: 32
        }
    })}
`;

const sidebarTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { right: 0 }
};

interface Props {
    children: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function Sidebar(props: Props) {
    const theme = useTheme();

    const sidebarRef = useRef(null);

    const close = useCallback(() => {
        props.setOpen(false);
    }, [props]);

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                close();
            }
        };

        if (props.open) {
            document.addEventListener('keydown', closeOnEsc, false);

            return () => {
                document.removeEventListener('keydown', closeOnEsc, false);
            };
        }
    }, [close, props.open]);

    useEffect(() => {
        if (props.open) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [props.open]);

    return (
        <>
            <Overlay open={props.open} onClose={close} />
            <Transition
                nodeRef={sidebarRef}
                mountOnEnter
                unmountOnExit
                in={props.open}
                timeout={theme.transitionDuration}
            >
                {(state) => (
                    <div ref={sidebarRef}>
                        <Wrapper
                            style={{
                                ...sidebarTransitionStyles[state]
                            }}
                        >
                            <CloseButton
                                title="Lukk"
                                onClick={close}
                                icon={<CloseIcon width={24} height={24} />}
                            />
                            {props.children}
                        </Wrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}
