import React, { CSSProperties, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import { Transition } from 'react-transition-group';
import Overlay from './Overlay';
import { disableScroll, enableScroll } from '../../utils/scroll';
import { useContext } from 'utils/context';
import { ModalContext, ModalType } from 'state/modal';
import Search from 'components/search/Search';
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
    padding: '16px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '32px'
    }
}));

const ModalSection = styled(Section)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '800px',
    maxHeight: '600px',
    height: '100%',
    padding: 0
});

const modalTransitionStyles: { [id: string]: CSSProperties } = {
    entered: { opacity: 1 }
};

type ModalContentMap = {
    [key in ModalType]: JSX.Element;
};

const modalContentMap: ModalContentMap = {
    [ModalType.Search]: <Search />
};

export default function Modal() {
    const theme = useTheme();

    const { modalOpen, setModalOpen, modalType } = useContext(ModalContext);

    const modalRef = useRef(null);

    const close = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);

    const handleWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key == 'Escape') {
                close();
            }
        };

        if (modalOpen) {
            document.addEventListener('keydown', closeOnEsc, false);

            return () => {
                document.removeEventListener('keydown', closeOnEsc, false);
            };
        }
    }, [close, modalOpen]);

    useEffect(() => {
        if (modalOpen) {
            disableScroll();
        } else {
            enableScroll();
        }
    }, [modalOpen]);

    const modalContent = useMemo(
        () => modalType !== undefined && modalContentMap[modalType],
        [modalType]
    );

    return (
        <>
            <Overlay open={modalOpen} />
            <Transition
                nodeRef={modalRef}
                mountOnEnter
                unmountOnExit
                in={modalOpen}
                timeout={theme.transitionDuration}
            >
                {(state) => (
                    <div ref={modalRef}>
                        {modalContent && (
                            <Wrapper
                                style={{
                                    ...modalTransitionStyles[state]
                                }}
                                onClick={handleWrapperClick}
                            >
                                <ModalSection>{modalContent}</ModalSection>
                            </Wrapper>
                        )}
                    </div>
                )}
            </Transition>
        </>
    );
}
