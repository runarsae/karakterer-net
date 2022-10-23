import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarGutter: 'stable'
});

const Content = styled.div((props) => ({
    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '32px 0'
    }
}));

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <Wrapper>
            <Content>{children}</Content>
        </Wrapper>
    );
}
