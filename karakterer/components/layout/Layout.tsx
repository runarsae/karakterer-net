import { ReactNode } from 'react';
import styled from 'styled-components';
import Loading from './Loading';

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
    loading: boolean;
    children: ReactNode;
}

export default function Layout({ loading, children }: Props) {
    return <Wrapper>{loading ? <Loading /> : <Content>{children}</Content>}</Wrapper>;
}
