import HomePage from 'components/home';
import type { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>KARAKTERER.net</title>
                <meta
                    name="description"
                    content="Detaljert og oppdatert karakterstatistikk for alle emner på Norges teknisk-naturvitenskapelige universitet (NTNU) siden 2004. Karakterfordeling og utvikling i gjennomsnittskarakter og strykprosent."
                />
            </Head>
            <HomePage />
        </>
    );
};

export default Index;
