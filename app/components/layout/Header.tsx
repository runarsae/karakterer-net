import Section from 'components/common/Section';
import Image from 'next/image';
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

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gridTemplateColumns: props.hasTitle ? 'auto auto 1fr auto' : '1fr auto'
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

const LogoContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none'
});

const LogoWrapper = styled.div({
    display: 'flex',
    gap: '12px',
    cursor: 'pointer'
});

const LogoTextWrapper = styled.div((props) => ({
    display: 'none',

    [`@media (min-width: ${props.theme.breakpoints.xs}px)`]: {
        display: 'block'
    }
}));

interface Props {
    title?: string;
    navigation: ReactNode;
}

function Header({ title, navigation }: Props) {
    return (
        <Container hasTitle={Boolean(title)}>
            <LogoContainer>
                <Link href="/">
                    <LogoWrapper>
                        <Image
                            src="/logo-symbol.svg"
                            alt="Logo"
                            width={28}
                            height={28}
                            quality={100}
                            priority
                        />
                        <LogoTextWrapper>
                            <Image
                                src="/logo-text.svg"
                                alt="karakterer.net"
                                width={136}
                                height={32}
                                quality={100}
                                priority
                            />
                        </LogoTextWrapper>
                    </LogoWrapper>
                </Link>
            </LogoContainer>
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
