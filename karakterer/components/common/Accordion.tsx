import { ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { ArrowRightIcon } from './icons';
import Typography from './Typography';

const AccordionGroup = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
});

const AccordionContainer = styled.div({
    borderRadius: '4px',
    overflow: 'hidden'
});

const AccordionButton = styled.button((props) => ({
    display: 'grid',
    gridTemplateColumns: '16px 1fr',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    backgroundColor: props.theme.palette.card.main,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    color: 'inherit',
    border: 'none',
    outline: 0,
    margin: '0px'
}));

const IconContainer = styled.div<{ active: boolean }>((props) => ({
    display: 'flex',
    transition: `transform ${props.theme.transitionDuration}ms ease-out`,
    ...(props.active && { transform: 'rotate(90deg)' })
}));

const AccordionPanel = styled.div<{ active: boolean; scrollHeight?: number }>((props) => ({
    maxHeight: props.active && props.scrollHeight ? props.scrollHeight : '0px',
    overflow: 'hidden',
    transition: `max-height ${props.theme.transitionDuration}ms ease-out`,
    backgroundColor: props.theme.palette.card.hover
}));

const AccordionPanelContent = styled.div({
    padding: '16px'
});

interface AccordionProps {
    title: ReactNode;
    children: ReactNode;
    active: boolean;
    onClick: () => void;
}

function Accordion({ title, children, active, onClick }: AccordionProps) {
    const accordionItemPanelRef = useRef<HTMLDivElement>(null);

    return (
        <AccordionContainer>
            <AccordionButton onClick={onClick}>
                <IconContainer active={active}>
                    <ArrowRightIcon width={16} height={16} />
                </IconContainer>
                <Typography variant="h4">{title}</Typography>
            </AccordionButton>
            <AccordionPanel
                ref={accordionItemPanelRef}
                active={active}
                scrollHeight={accordionItemPanelRef.current?.scrollHeight}
            >
                <AccordionPanelContent>{children}</AccordionPanelContent>
            </AccordionPanel>
        </AccordionContainer>
    );
}

export { AccordionGroup, Accordion };
