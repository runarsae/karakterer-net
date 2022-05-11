import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import styled from 'styled-components';

const IconButton = styled.button<{ active: boolean }>((props) => ({
    WebkitAppearance: 'none',
    display: 'block',
    width: '42px',
    height: '42px',
    backgroundColor: 'transparent',
    color: props.active ? props.theme.palette.heading : props.theme.palette.text,
    border: 'none',
    padding: '8px',
    margin: 0,
    cursor: 'pointer',
    outline: '0',
    transition: `color ${props.theme.transitionDuration}ms ease-in-out`,

    '@media (hover: hover)': {
        ':hover': {
            color: props.theme.palette.heading
        }
    }
}));

interface Props {
    title: string;
    path?: string;
    active?: boolean;
    onClick?: () => void;
    icon: ReactNode;
}

const NavigationItem = ({ title, icon, path, active, onClick }: Props) => {
    const router = useRouter();

    return (
        <IconButton
            title={title}
            onClick={() => (path ? router.push(path) : onClick ? onClick() : undefined)}
            active={active || router.asPath === path}
        >
            {icon}
        </IconButton>
    );
};

export default NavigationItem;
