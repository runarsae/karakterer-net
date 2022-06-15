import { useRef } from 'react';
import { Transition } from 'react-transition-group';
import styled, { useTheme } from 'styled-components';

const Backdrop = styled.div((props) => ({
    display: 'block',
    opacity: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: props.theme.palette.overlay,
    transition: 'opacity ' + props.theme.transitionDuration + 'ms ease-in-out',
    zIndex: 10
}));

const overlayTransitionStyles: { [id: string]: React.CSSProperties } = {
    entered: { opacity: 1 }
};

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function Overlay(props: Props) {
    const theme = useTheme();

    const overlayRef = useRef(null);

    return (
        <Transition
            nodeRef={overlayRef}
            mountOnEnter
            unmountOnExit
            in={props.open}
            timeout={theme.transitionDuration}
        >
            {(state) => (
                <Backdrop
                    ref={overlayRef}
                    onClick={props.onClose}
                    style={{
                        ...overlayTransitionStyles[state]
                    }}
                />
            )}
        </Transition>
    );
}
