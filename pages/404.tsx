import Section from 'components/common/Section';
import { Body1, Heading1 } from 'components/common/Typography';
import Header from 'components/layout/Header';
import {
    Navigation,
    NavigationItemAbout,
    NavigationItemSearch
} from 'components/layout/Navigation';
import Head from 'next/head';
import styled from 'styled-components';
import { NextPageWithLayout } from './_app';

const Wrapper = styled.div((props) => ({
    textAlign: 'center',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        paddingTop: '32px',
        paddingBottom: '32px'
    }
}));

const Custom404: NextPageWithLayout = () => {
    return (
        <Wrapper>
            <Section size="small">
                <Heading1>404</Heading1>
                <Body1>Den forespurte siden ble ikke funnet.</Body1>
            </Section>
        </Wrapper>
    );
};

Custom404.getLayout = (page) => (
    <>
        <Head>
            <title>{`Side ikke funnet -  karakterer.net`}</title>
            <meta
                name="description"
                content="Detaljert og oppdatert karakterstatistikk for alle emner på Norges teknisk-naturvitenskapelige universitet (NTNU) siden 2004. Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent."
            />
        </Head>

        <Header
            navigation={
                <Navigation>
                    <NavigationItemSearch />
                    <NavigationItemAbout />
                </Navigation>
            }
        />

        {page}
    </>
);

export default Custom404;
