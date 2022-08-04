import { ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArrowRightIcon } from './icons';
import Typography from './Typography';

const AccordionContainer = styled.div({
    borderRadius: '4px',
    overflow: 'hidden'
});

interface AccordionItem {
    title: ReactNode;
    content: ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
}

function Accordion({ items }: AccordionProps) {
    const [active, setActive] = useState<number>();

    const handleAccordionItemClick = (index: number) => {
        setActive((prevValue) => (prevValue === index ? undefined : index));
    };

    return (
        <AccordionContainer>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    active={active != undefined && active === index}
                    handleClick={() => handleAccordionItemClick(index)}
                />
            ))}
        </AccordionContainer>
    );
}

const AccordionItemButton = styled.button((props) => ({
    display: 'grid',
    gridTemplateColumns: '16px 1fr',
    alignItems: 'center',
    gap: '8px',
    padding: '16px',
    backgroundColor: props.theme.palette.card,
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    color: 'inherit',
    border: 'none',
    outline: 0
}));

const IconContainer = styled.div<{ active: boolean }>((props) => ({
    transition: `transform ${props.theme.transitionDuration}ms ease-out`,
    ...(props.active && { transform: 'rotate(90deg)' })
}));

const AccordionItemPanel = styled.div<{ active: boolean; scrollHeight?: number }>((props) => ({
    maxHeight: props.active && props.scrollHeight ? props.scrollHeight : '0px',
    overflow: 'hidden',
    transition: `max-height ${props.theme.transitionDuration}ms ease-out`,
    backgroundColor: props.theme.palette.popup
}));

const AccordionItemPanelContent = styled.div({
    padding: '16px'
});

interface AccordionItemProps extends AccordionItem {
    active: boolean;
    handleClick: () => void;
}

function AccordionItem({ title, content, active, handleClick }: AccordionItemProps) {
    const accordionItemPanelRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <AccordionItemButton onClick={handleClick}>
                <IconContainer active={active}>
                    <ArrowRightIcon width={16} height={16} />
                </IconContainer>
                <Typography variant="h4">{title}</Typography>
            </AccordionItemButton>
            <AccordionItemPanel
                ref={accordionItemPanelRef}
                active={active}
                scrollHeight={accordionItemPanelRef.current?.scrollHeight}
            >
                <AccordionItemPanelContent>{content}</AccordionItemPanelContent>
            </AccordionItemPanel>
        </div>
    );
}

export default Accordion;
