import Section from 'components/common/Section';
import Link from 'next/link';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled(Section)<{ hasTitle: boolean }>((props) => ({
    maxWidth: '1440px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',
    gap: 0,
    rowGap: '16px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gridTemplateColumns: props.hasTitle ? 'auto auto 1fr auto' : '1fr auto'
    }
}));

const LogoText = styled.span((props) => ({
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'Poppins',
    fontSize: '16px',
    color: props.theme.palette.heading,

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        fontSize: '20px'
    }
}));

const Line = styled.div((props) => ({
    display: 'none',
    width: '0px',
    height: '24px',
    borderRight: '1px solid ' + props.theme.palette.horizontalLine,
    margin: '0 16px',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        display: 'block'
    }
}));

const Title = styled.div((props) => ({
    display: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        display: 'block',
        fontSize: '18px'
    }
}));

interface Props {
    title?: string;
    navigation: ReactNode;
}

function Header({ title, navigation }: Props) {
    return (
        <Container hasTitle={Boolean(title)}>
            <Link href="/">
                <LogoText>karakterer.net</LogoText>
            </Link>
            {title && (
                <>
                    <Line />
                    <Title>{title}</Title>
                </>
            )}
            {navigation}
        </Container>
    );
}

export default Header;
