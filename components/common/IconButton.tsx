import { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button<{ active: boolean }>((props) => ({
    appearance: 'none',
    display: 'block',
    width: '42px',
    height: '42px',
    backgroundColor: 'transparent',
    color: props.active ? props.theme.palette.heading : props.theme.palette.text,
    border: 'none',
    padding: '8px',
    margin: 0,
    cursor: props.active ? 'default' : 'pointer',
    outline: '0',
    transition: `color ${props.theme.transitionDuration}ms ease-in-out`,

    '@media (hover: hover)': {
        ':hover': {
            color: props.theme.palette.heading
        }
    }
}));

interface Props {
    className?: string;
    title: string;
    active?: boolean;
    onClick?: () => void;
    icon: ReactNode;
}

const IconButton = ({ className, title, icon, active, onClick }: Props) => {
    return (
        <Button title={title} onClick={onClick} active={active || false} className={className}>
            {icon}
        </Button>
    );
};

export default IconButton;
