import React, { CSSProperties, useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Transition } from 'react-transition-group';
import Overlay from './Overlay';
import { disableScroll, enableScroll } from '../../utils/scroll';
import Section from './Section';

const Wrapper = styled.div((props) => ({
    display: 'flex',
    position: 'fixed',
    zIndex: 2,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: `opacity ${props.theme.transitionDuration}ms ease-in-out`,
    padding: 0,
    backgroundColor: 'transparent',
    pointerEvents: 'none'
}));

const ModalSection = styled(Section)({
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    height: '100%',
    padding: '32px',
    overflowY: 'hidden',
    margin: 'auto',
    maxWidth: '800px',
    maxHeight: '664px',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none'
});

const modalTransitionStyles: { [id: string]: CSSProperties } = {
    entering: { opacity: 1 },
    entered: { opacity: 1 }
};

interface Props {
    children: JSX.Element;
    open: boolean;
    onClose: () => void;
}

export default function Modal({ children, open, onClose }: Props) {
    const theme = useTheme();

    const modalRef = useRef(null);

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
                nodeRef={modalRef}
                mountOnEnter
                unmountOnExit
                in={open}
                timeout={theme.transitionDuration}
            >
                {(state) => (
                    <div ref={modalRef}>
                        <Wrapper
                            style={{
                                ...modalTransitionStyles[state]
                            }}
                        >
                            <ModalSection>{children}</ModalSection>
                        </Wrapper>
                    </div>
                )}
            </Transition>
        </>
    );
}
