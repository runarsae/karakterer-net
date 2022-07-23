import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto'
});

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return <Wrapper>{children}</Wrapper>;
}
