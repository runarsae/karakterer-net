import type { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Hello world</title>
                <meta name="description" content="Hello world" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            Hello world
        </div>
    );
};

export default Index;
