import { NextPage } from 'next';
import Head from 'next/head';
import Wrapper from 'components/common/Wrapper';
import AboutPage from 'components/about';

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>{`Informasjon - karakterer.net`}</title>
            </Head>
            <Wrapper>
                <AboutPage />
            </Wrapper>
        </>
    );
};

export default About;
